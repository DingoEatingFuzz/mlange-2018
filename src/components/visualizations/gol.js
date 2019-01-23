import React from 'react';
import { default as wggl, fs, vs, attr, uniform, texture, buffer, QUAD2 } from 'wggl';
import colorizeSrc from './colorize';

const vert = vs`
  attribute vec2 quad;

  void main() {
    gl_Position = vec4(quad, 0, 1.0);
  }
`

// Use a generic noise "random" function to seed the board based on a chance factor
// In other words, turn [chance]% of the pixels "on" (white instead of black)
const setup = fs`
  uniform float chance;
  uniform highp float seed;

  highp float random(vec2 co) {
      highp float a = 12.9898;
      highp float b = 78.233;
      highp float dt= dot(co.xy ,vec2(a,b));
      highp float sn= mod(dt,3.14);
      return fract(sin(sn) * seed);
  }

  void main() {
    float r = random(gl_FragCoord.xy);
    if (r <= chance) {
      gl_FragColor = vec4(1.0);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Compute the next state of the game of life simulation by looking at neighboring pixels
const gol = fs`
  uniform sampler2D state;
  uniform vec2 scale;

  int get(vec2 offset) {
    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
  }

  void main() {
    int sum =
      get(vec2(-1.0, -1.0)) +
      get(vec2(-1.0, 0.0)) +
      get(vec2(-1.0, 1.0)) +
      get(vec2(0.0, -1.0)) +
      get(vec2(0.0, 1.0)) +
      get(vec2(1.0, -1.0)) +
      get(vec2(1.0, 0.0)) +
      get(vec2(1.0, 1.0));
    if (sum == 3) {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    } else if (sum == 2) {
      float current = float(get(vec2(0.0, 0.0)));
      gl_FragColor = vec4(current, current, current, 1.0);
    } else {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
  }
`

// Scale the game of life board to another size (typically to the size of the canvas)
const copy = fs`
  uniform sampler2D state;
  uniform vec2 scale;

  void main() {
    gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);
  }
`

// Change the black/white color scheme to something a little more pleasing + add gridlines
const colorize = fs(colorizeSrc)

export default class Gol extends React.Component {
  componentDidMount() {
    this.seed = Math.random() * 50
    this.setupGOLProgram();

    this.resizeHandler = window.addEventListener('resize', e => {
      requestAnimationFrame(() => {
        this.setupGOLProgram()
      })
    })

    this.startAnimation();
  }

  setupGOLProgram() {
    const scale = this.scale = 2;
    const canvas = this.refs.canvas
    const canvasScale = Math.min(window.devicePixelRatio, 2)

    // Canvas dimensions have to be a multiple of the scale for the gridlines to line up
    this.cw = canvas.width = Math.ceil(canvas.clientWidth * canvasScale / scale) * scale
    this.ch = canvas.height = Math.ceil(canvas.clientHeight * canvasScale / scale) * scale

    this.stateBuffer = buffer(canvas);
    this.multiPass = buffer(canvas);
    this.mp = texture(canvas.width, canvas.height)(canvas)

    const w = this.w = Math.ceil(canvas.width / scale)
    const h = this.h = Math.ceil(canvas.height / scale)

    this.current = texture(w, h)(canvas)
    this.next = texture(w, h)(canvas)

    this.program = wggl(canvas, {
      gol: [
        vert({ quad: attr(2) }),
        gol({ scale: uniform(), state: uniform() })
      ],
      display: [
        vert({ quad: attr(2) }),
        copy({ scale: uniform(), state: uniform() })
      ],
      colorize: [
        vert({ quad: attr(2) }),
        colorize({ seed: uniform(), state: uniform(), scale: uniform(), ratio: uniform() }),
      ],
      setup: [
        vert({ quad: attr(2) }),
        setup({ chance: uniform(), seed: uniform() }),
      ],
    })

    this.program.setup.drawTo(this.stateBuffer(this.current), { quad: QUAD2, chance: 0.1, seed: Math.random() * 20000 + 30000 })

    // Since the board starts off random, step once off-screen to skip pass the jarring busy scren
    this.program.gol.drawTo(this.stateBuffer(this.next), { quad: QUAD2, state: this.current.texture, scale: [this.w, this.h] })
    this.flipBuffers()
  }

  componentWillUnmount() {
    // remove event listeners
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler)
    }

    this.stopAnimation();
  }

  startAnimation() {
    this.frameId = requestAnimationFrame(this.loop.bind(this))
  }

  stopAnimation() {
    window.cancelAnimationFrame(this.frameId)
  }

  flipBuffers() {
    let tmp = this.current.texture
    this.current.from(this.next.texture)
    this.next.from(tmp)
  }

  loop() {
    this.program.gol.drawTo(this.stateBuffer(this.next), { quad: QUAD2, state: this.current.texture, scale: [this.w, this.h] })
    this.program.display.drawTo(this.multiPass(this.mp), { quad: QUAD2, state: this.current.texture, scale: [this.cw, this.ch] })
    this.program.colorize.draw({
      quad: QUAD2,
      state: this.mp.texture,
      seed: this.seed,
      ratio: this.scale,
      scale: [this.cw, this.ch]
    })

    this.flipBuffers();

    this.frameId = requestAnimationFrame(this.loop.bind(this))
  }

  render() {
    return (<div style={{ width: '100%', height: '100%' }} onClick={this.setupGOLProgram.bind(this)}>
      <canvas ref="canvas" style={{width:'100%', height:'100%', background: 'white'}}></canvas>
    </div>)
  }
}

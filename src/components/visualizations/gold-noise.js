import React from "react";
import { default as wggl, fs, vs, attr, uniform, texture, QUAD2 } from "wggl";

const vert = vs`
  attribute vec2 quad;
  void main() {
    gl_Position = vec4(quad, 0, 1.0);
  }
`;

const goldNoise = fs`
  // Gold Noise ©2015 dcerisano@standard3d.com
  // - based on the Golden Ratio
  // - uniform normalized distribution
  // - fastest static noise generator function (also runs at low precision)

  uniform float time;

  const float PHI = 1.61803398874989484820459; // Φ = Golden Ratio

  float gold_noise(in vec2 xy, in float seed) {
    return fract(tan(distance(xy*PHI, xy)*seed)*xy.x);
  }

  vec3 tint(in float nn) {
    float n = nn * 0.8 + 0.2;
    return vec3(n * 151.0 / 255.0, n * 94.0 / 255.0, n * 132.0 / 255.0);
  }

  void main() {
    float n = gold_noise(gl_FragCoord.xy, time);
    gl_FragColor = vec4(tint(n), 1.0);
  }
`;

export default class GoldNoise extends React.Component {
  componentDidMount() {
    // Annoying hack to ensure the container's dimensions are
    // settled by the time the GL viewport is set.
    setTimeout(() => {
      this.setupNoiseProgram();

      this.resizeHandler = e => {
        requestAnimationFrame(() => {
          this.setupNoiseProgram();
        });
      };

      window.addEventListener("resize", this.resizeHandler);

      this.startAnimation();
    }, 0);
  }

  setupNoiseProgram() {
    const canvas = this.refs.canvas;

    this.program = wggl(
      canvas,
      vert({ quad: attr(2) }),
      goldNoise({ time: uniform() })
    );
  }

  componentWillUnmount() {
    // remove event listeners
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }

    this.stopAnimation();
  }

  startAnimation() {
    this.frameId = requestAnimationFrame(this.loop.bind(this));
  }

  stopAnimation() {
    window.cancelAnimationFrame(this.frameId);
  }

  loop() {
    this.program.draw({ time: Math.random(), quad: QUAD2 });
    this.frameId = requestAnimationFrame(this.loop.bind(this));
  }

  render() {
    return (
      <canvas
        ref="canvas"
        style={{ width: "100%", height: "100%", background: "white" }}
      ></canvas>
    );
  }
}

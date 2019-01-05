HashiCorp's events are something special. A dedicated in-house events team makes sure every single detail is considered and perfected. At HashiConf 2018, in San Francisco, one of the many details was this generative art installation in the HashiCafe.

## Purpose

First, let's be clear that this is art and art doesn't need a purpose. If you go through life constantly searching for meaning, you will leave this world disappointed. But, this particular installation was a piece of a larger puzzle and it did have some purpose.

We wanted something fun, creative, and unexpected. A lot of people who go to tech conferences go to _a lot_ of tech conferences, and they can all start feeling the same. It takes something special to break that rhythmic monotony. A 2D plotter sitting modestly in a cafe does exactly that.

We also wanted something physical. Engineers write code all the time, so seeing things off screen is a treat. Watching the [AxiDraw]() plotter is a treat in itself.

Lastly, we wanted something that could be taken home.

Putting this all together meant a generative art piece that tied into the HashiCorp brand and plotted fast enough that we could make a lot of them over the two days.

## Writing the code

HashiCorp has [really strong product brands](), so I had no shortage of imagery and motifs to work with, but everything had to be implemented as code. Fortunately our branding is rather geometric, but it's eye-opening how much math programs like Illustrator and Sketch are doing that we just take for granted.

In order to draw lines within a polygon, I had to write a clipping mask implementation* from scratch. Things went from "I'm having fun with shapes" to "slope intercepts, quadratic formula, normal vectors, oh my!" really fast. Honestly the math just added to the fun. It meant everything took longer than expected, but I was more than okay with taking it slow and enjoying exploring more computational geometry.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Normally I would do something cheeky like draw black rectangles over the inverse of the bounding box, or use a clipping mask when available, but having the pure arc paths allows for cool things like this. It&#39;s also (hopefully) plotter safe! <a href="https://t.co/UrWgK9v4TW">pic.twitter.com/UrWgK9v4TW</a></p>&mdash; Michael Lange (@DingoEatingFuzz) <a href="https://twitter.com/DingoEatingFuzz/status/1038837090836918272?ref_src=twsrc%5Etfw">September 9, 2018</a></blockquote>


The end result was a single program that would generate an SVG of a random product grid for a given seed. This SVG was then plotted with the AxiDraw plotter.

<small>*Okay, it's not a _complete_ implementation, but it works for arbitrary lines and circles in an arbitrary polygon.</small>

## Working with the plotter

Before this project, I had never used an AxiDraw. I knew going in that I would need some alone time with the plotter to learn how it works and pick up some best practices. This meant figuring out how to scale an SVG to a piece of paper and align that with a piece of paper underneath the plotter's pen arm. It also meant experimenting with different papers and inks to see what works and what doesn't.

Since the theme of HashiConf was black and gold, we wanted to also use black and gold with this generative art to tie the theme in. We ended up using a nice black card stock along with gold gelly pens. Although gelly pens sound childish, they resulted in truly beautiful shimmering line art. However, gelly pens lay ink down thick. With SVGs, lines can be infinitesimally thin, so translating what was an acceptable line thickeness and distance on the screen to the paper took some trial and error. If artwork was too dense, it would be plotted as a blob. If artwork was too sparse, large, or simple it would compromise the overall composition or branding.

Lastly, there is a fair amount of finesse that needs to go into setting up any pen in the plotter. The pen is lowered to the paper by gravity, so putting the pen in too tightly creates friction that may mean the pen won't make it down to the paper by the time the plotter driver thinks it has. Conversely, a loose pen may not go up and down at all, causing drag marks. Although ideally this would never happen, it's easily prevented with some practice.

## The performance

After writing the code to generate the art and working with the plotter to choose the best paper and ink as well as dial in the art to make sure it plots well, everything was done end to end. However, we wanted to make as many plots as we could in two days, and everyone who staffs HashiConf is wearing many hats: giving talks, doing booth duty, meeting with customers, etc. This meant the performance of plotting on site needed to be thought through for the most success.

The single most effective way to ensure everything went smoothly was to automate as much of this process as possible. The standard way to use the AxiDraw plotter is to create an SVG however you like, then use Inkscape to layout the graphic and send it to the plotter. This is a tedious process that requires a lot of prep work. It's not so bad when you are only making one plot, but we were making 100+ plots. Fortunately, the fine folks at AxiDraw have been working on a CLI tool and a Python SDK for exactly our purpose.

Using the CLI tool and the SDK, I was able to construct a make file that had targets for

1. Invoking Processing to generate an SVG and save it to disk
2. Raise and lower the plotter pen
3. Reset the plotter motors (to change pens and manually push it back to the origin point)
4. Tell the plotter to plot the SVG Processing generated

All this together made operating the plotter quite simple. A single command, `make generate && make plot` would create a graphic and plot it. If a pen ran out of ink or if something went haywire in any way, `make raise` would lift the pen off the paper, and `make release-motors` would allow the operator to manually reset the position of the pen. Staff were able to be trained on the plotter in less than 10 minutes, so we could cycle shifts throughout the conference.

The last piece of the performance was creating a preview screen so it was a little more obvious what the plotter was doing. This ended up being a quick and dirty little express server I wrote the day before. It watched the filesystem for changes to the SVG file the plotter looked for and used a websocket to send that new SVG over to a web browser. The client page styled the SVG in black and gold using CSS as you'd imagine.

All this together made for a pretty seamless performance. Next time I'll do a better job estimating how much paper and ink we'll go through, so I won't have to make another emergency trip to the art store.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Only at HashiConf, you can get a plotter-print of HashiCorp tools. Each background is randomized and totally unique! <a href="https://twitter.com/DingoEatingFuzz?ref_src=twsrc%5Etfw">@DingoEatingFuzz</a> <a href="https://t.co/YIcSEuzAdl">pic.twitter.com/YIcSEuzAdl</a></p>&mdash; Mitchell Hashimoto (@mitchellh) <a href="https://twitter.com/mitchellh/status/1054827741890002945?ref_src=twsrc%5Etfw">October 23, 2018</a></blockquote>


## Technology used

- Processing
- Python
- Axidraw
- Express
- Make

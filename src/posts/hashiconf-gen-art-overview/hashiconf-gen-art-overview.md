---
title: "HashiConf 2019 Generative Art Installation"
date: "2019-10-20"
thumbnail: ./hashiconf-19-plot-1.jpg
---

Last month I had the incredible privilege of bringing an art installation to [HashiConf 2019]() in Seattle. This marked the second year I got to [expose the attendees of this cloud infrastructure conference to modern art](), which meant I had to outdo expectations.

The basics of this year's installation were the same as last year's: using an [AxiDraw plotter](), create unique pieces of art that attendees get to take home. However, after piloting the concept last year, I had plenty of ideas on how to improve everything.

Ultimately, the take-home art ended up looking like this:

![An example of the generative art](./hashiconf-19-plot-1.jpg)

But the physical artifact is just one part of the project.

This is a series of posts dedicated to the different aspects of the installation, ranging from how HashiCorp software was used to how the art was designed for the conference medium with performance art in mind.

Before diving into each piece of the project, I think it will be useful to ground the whole thing by covering what the goals were and a high-level view of all the moving parts.

## Goals

1. **Make the event an experience:** This is something that the HashiCorp Events and Experiential team is always thinking about. An ethos that needs to be carried by this project too.
2. **Make swag:** As fun as it is thinking about this as art, the goal isn't to get into a gallery, it's to make swag.
3. **Each piece unique:** Since the plotter is plotting on-demand, each piece can be unique. This makes the swag more personal.
4. **Tie it to HashiCorp products:** People come to HashiConf because they are practitioners of the HashiCorp product portfolio. The swag should embody that.
5. **Capture the moment:** This is specifically swag for HashiConf 2019 and it should seek to crystallize that moment, triggering nostalgia years from now.
6. **High yield:** HashiConf has over a thousand attendees. It's not realistic to make one plot for every attendee, but hundreds is attainable.
7. **Be a spectacle:** The art is being made in realtime by high-precision robots. We should lean into that.
8. **Technically impressive:** If attendees can't appreciate the art, they should at least be able to appreciate the work that went into orchestrating all the pieces.

And that's all. No big deal, right?

## High-level Overview

Here's what the installation looked like. Click or hover over the annotations to read about specific components.

![The generative art installation on-site](./plotter-setup.jpg)

1. **Local computer:** This is the computer the AxiDraw plotters were plugged into. It runs the local web service that tells the AxiDraws when and what to draw as well as maintaining the state machines for each plotter. It is controlled through webhooks made accessible via an [ngrok tunnel]().

2. **Preview tablets:** One tablet per plotter with a webpage open that shows what is being plotted. The page automatically updates when the next plot starts. Since what is being plotted is a single perspective of a 3D form, the preview shows the 3D form rotating.

3. **Axidraw Plotters:** Two-axis plotters made by [Evil Mad Scientist] that hold pens and draw on paper.

4. **Magnets:** Each piece of paper is pinned down with magnets latching onto sheet metal under the cutting mats. This makes it really easy to switch out paper when a plot is finished. The grid on the cutting mats also helps ensure that each plot comes out straight.

5. **Flic IoT buttons:** A button per plotter that sends web requests to the webhooks service to queue plotter jobs and operate the plotters, (i.e., lift/lower the pen and release motors if necessary).

6. **Gallery placards:** Little descriptions of each piece with technical details for passive consumption of the installation.

7. **Finished plots:** A stash of plots ready for attendees to take home. They are also helpful for explaining that each plot is unique.

8. **Framed plot:** The first plot, framed. It now lives on my mantle.

9. **UI computer:** A computer and giant display for showing the web UIs of the Nomad and Consul clusters powering the installation. It's meant to be used by attendees to make the installation more interactive.

10. **Pens and paper:** A whole bunch of pens and paper for future plots.

## Where to now

Okay! That's the project in a nutshell. It covers many disciplines, so no worries if you aren't interested in every piece. I wrote about all aspects in detail, but consider the following a choose-your-own-adventure reading list.

1. **Infrastructure:**
2. **Microservices:**
3. **AxiDraw:**
4. **Art Concept:**
5. **Installation:**
6. **(Bonus) Seattle Map:**
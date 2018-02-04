---
title: "Up and running with Gatsby"
date: "2018-01-15"
---

[Gatsby.js]() is the missing piece of the React ecosystem I've been waiting for. As someone who spends most of his time in [Ember], experimenting with other frameworks and libraries has always been immediately stained with the chore of having to set up a build pipeline. Grunt, Gulp, Browserify, Broccoli, JSPM and SystemJS, Webpack, Rollup, and now Parcel, I guess, represents a collection of very important tooling that I just don't want to deal with. I am so glad there are people out there who like this problem space. I, however, do not.

I want to build great web experiences, setting up the build pipeline is like having to do dishes when what you want to do is cook. Except the dishes are always changing and never ending. And you have to do the dishes first. Then you're tired and bored and all you have to show for it is something that other languages and frameworks give you for free. Gatsby gives you this for free.

It is known as a static site generator, and this is true, but it's more than that. It's a React website compiler. Think of it like Ember CLI or Angular CLI. It's an opinionated tool for turning your source into browser-ready assets. It's also incredibly good at it. Much like how most low-level developers are better off writing C++ than C because the compiler is better than most people at writing optimized instructions, Gatsby is better than most people at creating optimized browser assets. This includes things like

  1. Inlining critical CSS
  2. Using base64 data URIs instead of making additional network requests for small images
  3. Code splitting JS and CSS
  4. Server-side rendering React source code
  5. Tree-shaking data sources

## Static sites do more than they seem

The concept of a static site builder carries baggage of blogs, portfolios, and marketing landing pages. These are great use cases for static web sites, but there's much more than that. An increasingly common pattern is to decouple the backend as some form of API and the frontend as some sort of collection of static assets. This is great because the frontend is highly cacheable, easy to be served from [the edge](https://www.cloudflare.com/learning/cdn/glossary/edge-server/), and can now be built and deployed out of band of whatever services make up the backend. Since the frontend is interacting with an out-of-band API, the frontend can still be highly sophisticated at the same time as being static. The hip name for this is the [JAMStack](https://jamstack.org/). I don't think it needs its own name, but whatever.

## The A in the JAM

JAM stands for JavaScript, APIs, and [Prebuilt] Markup. The JavaScript part is obvious, that's your frontend web code, be it Vue, Knockout, React, Ember, or whatever. The Markup is also obvious, that's your JSX, Handlebars, Directives + HTML, or what-have-yous. The prebuild part suggests that whatever your choice of templating is, it should be compiled at deploy-time rather than runtime. This is certainly a best practice, but I don't think it's a requirement. The API part is trickier. It's a dependency.

Since it's a dependency, a static website builder could just ignore it. There could be a footnote in the Gatsby docs that say "Oh by the way, this is the Internet. Use CORS and go nuts if you want to drive your views with data." I'm happy that Gatsby doesn't do this. It's too common of a task to leave to userland. If you're going to assist in everything else, might as well assist here too, right?

In fact the API part of Gatsby might be the most compelling point. Not only does it have concepts for interacting with arbitrary datasources, it has plugins to the compiler itself for turning your source code and filesystem _into_ a datasource. The conventional "Let's take your flat files and make them blog posts" gets extended to "Let's take your flat files and make them into a static GraphQL API for you". This makes it easy to use third-party APIs as well as "local" APIs when fetching data and making views.
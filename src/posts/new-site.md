---
title: "New Site"
date: "2019-04-18"
thumbnail: ./thumbnails/default.png
---

This is the obligatory "I made a new site!" post. It's not gonna be very long, but I wanted to at least
list the major tech pillars and why I chose them.

## 1. [Gatsby](https://www.gatsbyjs.org/)

**What is it:** A static website builder written in JS and wrapping React.
**Why I chose it:** A wanted a static website builder for the normal reasons, I didn't want a server,
CDNs are fast, serving static files is cheap. What Gatsby (and [Next](https://nextjs.org/), [VuePress](https://vuepress.vuejs.org/), and [Prember](https://github.com/ef4/prember)) add is an integrated client-side framework for making rich interactivity. I chose Gatsby out of the list because it was the first I heard of, I'm already familiar with React,
and it has a strong community.

## 2. [Sass/SCSS](https://sass-lang.com/)

**What is it:** The tried and true CSS preprocessor that enhances the language with features such as imports,
nested selectors, custom functions, and mixins.
**Why I chose it:** I'm not ready to jump ship to CSS-in-JS. Conceptually, I don't think it's a good idea,
and for a site the size of mine, with exactly one contributor, I wasn't concerned about the weaknesses to CSS that
CSS-in-JS tries to solve. One new thing I'm trying out is CSS4 variables. The trick I'm using is to use variables in
style sheet declarations, but to define the values of those variables via inline styles in JSX where I can read variable
values from places like frontmatter, JSON, etc.

## 3. [Wggl](https://github.com/dingoeatingfuzz/wggl)

**What is it:** My own WebGL wrapper library.
**Why I chose it:** I'll write about this more later, I think, but it boils down to three reasons. Reason one is that
interfacing with WebGL directly is tedious, error-prone, and frankly asking for an abstraction. Reason two is that despite
only having this site to think about, I figured I could write that abstraction. Reason three is I somehow entirely missed
[regl](http://regl.party/) when researching existing solutions.

## 4. [TOML](https://github.com/toml-lang/toml)

**What is it:** A configuration language.
**Why I chose it:** You gotta have something, and TOML is the apex of configuration languages that are nice to use and are
adopted standards. JSON is too verbose, YAML is too surprising and clunky, anything else isn't popular enough.

## 5. [Slides MD](https://github.com/DingoEatingFuzz/mlange-2018/blob/master/transformers/slides-md.js)

**What is it:** A specialized Markdown superset for documenting slide decks.
**Why I ~~chose~~ wrote it**: I needed a way to author talk pages that satisfied the design I wanted. Markdown + frontmatter almost checked all the boxes, but I wanted to separate each slide so I could think of slide content as data that got treated in the template. [MDX](https://mdxjs.com/) almost worked, since it would let me wrap each slide in a component, but that isn't treating content as data, that's embedded the templating within the data. Then I found [MDX Slides](https://github.com/jxnblk/mdx-deck) which inspired me to look into making my own Gatsby transformer and my own syntax for splitting sections of a markdown file. I'll write more about this later too.

## The End

There you have it. I made a new site and I used things to make it.

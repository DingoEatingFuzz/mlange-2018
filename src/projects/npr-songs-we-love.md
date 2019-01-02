NPR curates an excellent "songs we love" list, but in 2014 they went above and beyond by releasing a [web app for their full 2014 Songs We Love setlist](https://apps.npr.org/best-songs-2014/). A bunch of coworkers and myself set out to listen to every single track in the list, all 300. We all ran into the same problem though: despite the app having links to music services like Spotify, Amazon, and the late Rdio, we would lose track of the songs we personally loved. The app desperately needed some sort of favoriting feature.

After going to [CascadiaJS](https://2014.cascadiajs.com/) in 2014 and [seeing Lydia's talk on bookmarklets](https://www.youtube.com/watch?v=h-BzNxuu2yw), I accepted an optional life quest to make a useful bookmarklet. With this Songs We Love app missing a favoriting feature, now was my chance.

## Bookmarklets

Bookmarklets are a form of bookmark that instead of linking to a URL links to a JavaScript snippet, using the `javascript:` protocol. This is mostly a vestigial feature of the Old Web, but since things don't get deprecated on the web, we can still use it today. A very simple bookmarklet looks something like this:

```js
javascript:alert('Hello world')
```

For the most part, the JavaScript to the right of the `javascript:` protocol can be anything inclosed in an iife, but there are caveats. The biggest one being that everything needs to be a single line.

But it's not like code has to be authored in a single line, it just needs to be delivered in one line. So I [wrote a build step](https://github.com/DingoEatingFuzz/npr-music-we-love-bookmarklets/blob/master/index.js) that reads a file, removes new lines, wraps the code in an iife, and prepends the protocol.

## Hearting tracks

To "heart" a track, a user just needs to click their "NPR Heart" bookmarklet in their bookmark bar. This is convenient because it means the UI of the NPR app doesn't need to be manipulated.

The bookmarklet runs in the same context as the current web page, which means it gets to leverage any globally accessible code the web page has. This can be dangerous of a bookmarklet is expected to be run on any number of websites, but since these were specifically meant for this app, I could safely use jQuery.

I used jQuery to scrape pertinent data from the "now playing" section of the UI. This included basics like track name and artist name as well as additional useful information such as streaming service links.

Next this object needed to be persisted to local storage. Again, since this bookmarklet runs in the same context as the current web page, the bookmarklet can also access local storage in the same way the app does. So persisting a hearted track meant parsing the existing heart list, appending the new track, and setting the new stringified array.

At this point, the user workflow is to

1. Use the app as directed
2. Click the NPR Heart button when the current song playing is good

So far this works perfectly in that the track is persisted to local storage, but there is no indication that this worked at all. To add some indication, I used jQuery again to temporarily attach an absolutely positioned image.

## Displaying hearted tracks

Having the list of hearted tracks in local storage doesn't do much good if there is no way to see the list. I made another bookmarket for printing out the list by leveraging the existing styles of the app. Using jQuery to add elements to the DOM is easy, but templating the list in the context of a bookmarklet was a much taller order.

I've always been a fan of mustache and handlebars, but I wasn't about to add a dependency to a bookmarklet. Instead I wrote my own minimum viable template compiler.

It used a simple syntax for handling value substitions and conditionals. Since ES5 doesn't have good multiline strings, I instead used the `Function#toString` trick. Put it all together, and the most complicated template looks like this in source:

```js
var trackTemplate = template(function() {/*
  <div class='song small' style='background:#0B0E13;border-bottom:2px solid #2F4C5A;'>
    <div class='container-fluid'>
      <div class='song-info'>
        <div class='song-info-wrapper'>
          <h2 class='artist'>{artist} <span class='tag-header'>(from {contributor})</span></h2>
          <h1 style='color:white' class='song-title'>{song}</h1>
          <ul class='song-tools list-unstyled'>
            [links.amazon? <li><a target='_blank' href='{links.amazon}' class='amazon'><span class='icon-amazon'></span></a> ]
            [links.itunes? <li><a target='_blank' href='{links.itunes}' class='itunes'><span class='icon-apple'></span></a> ]
            [links.rdio? <li><a target='_blank' href='{links.rdio}' class='rdio'><span class='icon-rdio'></span></a> ]
            [links.spotify? <li><a target='_blank' href='{links.spotify}' class='spotify'><span class='icon-spotify-circled'></span></a> ]
          </ul>
        </div>
      </div>
    </div>
  </div>
*/});
```

The `template` function just calls `toString` on the first argument and extracts the comment body. Within the comment body are two non-html language features: variables in the form of `{variable}`, and conditional in the form of `[boolean? <print if true>]`.

There are a lot of problems with this syntax if I was proposing a general purpose templating language, but I'm not. This was my own tiny little DSL. The "compiler" is barely 20 lines:

```js
function templateCompile(template, props) {
  /* handle conditionals */
  template = template.replace(/\[(.+?)\?(.*?)\]/g, function(str, prop, tmpl) {
    return getProp(props, prop) ? tmpl : '';
  });
  /* handle substitutions */
  template = template.replace(/\{(.+?)\}/g, function(str, prop) {
    return getProp(props, prop);
  });
  return template;
}

function getProp(obj, prop) {
  var propChain = prop.split('.');
  var val = obj;
  for (var i = 0, len = propChain.length; i < len; i++) {
    var newVal = val[propChain[i]];
    if (newVal) {
      val = val[propChain[i]];
    } else {
      return null;
    }
  }
  return val;
}
```

## Deploying the bookmarklets

The way people typically add bookmarklets is by dragging links from a web page into their bookmarks bar. So the deploy artifact for this project was an html page that contained the bookmarklet links and instructs for "installing" the bookmarklets.

This project was well received by a couple coworkers, and that was more than enough to make the project worth it.

## Technology used

- JavaScript
- jQuery
- Bookmarklets

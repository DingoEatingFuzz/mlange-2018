This was my first ever Chrome extension, and I built it in a quick weekend for a very personal utilitarian reason. In 2015, when I made this, I was working at Lytics. The Lytics API requires an API token as either the `key` query param or the `Authorization` request header value. The web admin would use the `Authorization` header to keep API URLs shorter and cleaner, but it meant that double-clicking a request in the Chrome dev tools network tab would result in a `401 Unauthorized` error. I knew in theory a Chrome extension could intercept and manipulate network activity, so I started experimenting.

## Solving the immediate problem

All I personally needed was a background script that would monitor all traffic, check if the URL for the request had the domain `api.lytics.io` and add a new `Authorization` header to the request with a hard coded API token.

This didn't take too long to hack together, as evidenced by the size of the [`background.js` file](https://github.com/DingoEatingFuzz/chrome-headers-middleman/blob/master/background.js).

## Solving the general problem

Stopping at solving the immediate problem has some clear downsides. The first is that the token is hardcoded, meaning when the token expires, it requires updating the extension from source. The second is I couldn't put it in the Chrome webstore this way, since it contained a single private token. The third is it only worked for the Lytics API despite manipulating headers being a general problem. So I had three things to handle:

1. Set and store arbitrary data
3. Some sort of form for specifying URLs that need rewrite rules
2. Some sort of form for inputting header rewrite rules

### Set and store arbitrary data

Chrome extensions have a storage API for stashing small amounts of data. Since I wasn't planning on storing large JSON payloads or binary blobs, it satisified my needs.

I was on a LevelDB kick at the time I wrote this, so I wrote my own [DB wrapper](https://github.com/DingoEatingFuzz/chrome-headers-middleman/blob/master/src/db.js) around the Chrome storage API to use with the forms I'd have to write for problems two and three.

### Some sort of form for specifying URLs that need rewrite rules

Chrome extensions each get an optional options page for handling configuration. This is the perfect place for putting forms. Since this is a decidedly developer-centric tool, I figured using regular expressions for specifying URL patterns is fine.

At this point I had a storage solution and an idea for how I'd structure the data, but I still needed to generate views based on this data as well as have actions for creating new URL patterns and rewrite rules.

This UI wasn't going to be immensely complicated, but it was going to be complicated enough that I wanted a framework or library to do some of the state management for me. I reached for React mainly because I was using Ember at work and I wanted to check out this rising React thing.

At this time (React v0.13) stateless functional components weren't a thing yet, so the code looks kind of clunky by modern standards. However, it holds up on the grounds of unidirectional data flow, composition, and action bubbling.

### Some sort of form for inputting header rewrite rules

From a UI point of view, inputting header rewrite rules is a near identical problem to specifying URLs: an expanding list of values to store. The only difference is header rewrite rules need a key and a value instead of just a value.

This is visually differentiated using nesting.

### Updating the background script to use the data the UI stores

The core code of reading a URL at the right time and injecting headers was already written to solve the immediate problem. Now that code just needed to be updated to iterate over the URL rules for comparison, rather than a direct comparison to `api.lytics.io`, and then iterate over the header rewrite rules to add/update header key/value pairs.

There are a couple of features I'd still like to add to this, but I honestly don't have a need for this tool anymore. It served me well when I needed to add that auth header, and maybe it will serve me again in the future, but for now I'm content with all the requests I make without any doctoring.

## Technology used

- JavaScript
- React
- Chrome extensions
- HTTP

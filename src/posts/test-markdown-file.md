---
title: "This is a test for Speakonia"
date: "2018-01-02"
---

# This is a test for Speakonia

Whatup?

```js{3}
var testThis = "hopefully it works";
function idk() {
  return "lol?" + 5;
}
```

## Okay, okay, but what about handlebars?

Yeah, that's a good question. We should probably try that out, and while we're at, let's use newer syntax and closure actions.

```handlebars
{{#each posts as |post|}}
  {{#some-button onClick=(action bubbleItUp)}}
    Button (pluralize labels.length "Label")
  {{/some-button}}
  {{another/component-here
    prop="one"
    prop=2
    prop=(hash (
      innerProp="one"
      innerProp="two"
      innerProp=(component "three")
    ))}}
{{else}}
  <p class="{{if isJumbo "jumbo"}} empty-message">Empty</p>
{{/each}}
```
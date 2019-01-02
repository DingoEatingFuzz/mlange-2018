This was my second Chrome extension. It started with a general distaste for the yellow "neutral" emoji skin tone. As someone who watched The Simpsons a lot growing up, I see the yellow skin tone as a white skin tone in a poor disguise. Sure yellow isn't actually white, and there is also a white skin tone emoji, but if you look at the characters in The Simpsons, there are no white characters and yet there are characters of color. Even if you disagree about yellow being another white option, you can't disagree that it's a way to opt-out of race, which I also think is unfortunate. Human skin tones are variable and can be celebrated instead of conveniently omitted. So, using [Cloud to Butt](https://github.com/panicsteve/cloud-to-butt) as inspiration, I set to work.

## Understanding emoji skin tones

In practical terms, there are five different skin tones (based off the [Fitpatrick scale](https://en.wikipedia.org/wiki/Fitzpatrick_scale)) that can be applied to emoji to change them from yellow to a true skin tone (one of Fitz-1/2, Fitz-3, Fitz-4, Fitz-5, and Fitz-6). in technical terms, any emoji that is "skin tone eligible" has six separate glyphs, for each of the five skin tones and the yellow default presentation. Although a glyph in a typeface typically maps one-to-one with a unicode code point, a glyph can also represent a [ligature](https://en.wikipedia.org/wiki/Typographic_ligature). Unicode considers ligatures to be a matter of presentation and therefore outside of its jurisdiction. Therefore, any typeface can choose to make a ligature for any combination of letters. Some common pairs, for example, are _fi_, _ff_, and _ae_. This same technical implementation is used to implement skintones. So 🎅🏿 is actually the ligature of 🎅 and 🏿. Which means that as soon as you place a skintone swatch character next to the Father Christmas emoji, it immediately becomes the skin tone variation of Father Christmas.

This is important to understand, since the extension will have to make the correct text substitions to apply skin tones.

## Understanding "skin tone eligibility"

Not all emoji can have skin tones applied to them. This works: 👶 + 🏼 = 👶🏼. This does not work: 🍭 + 🏼 = 🍭🏼. This makes intuitive sense, but the details need to be implemented somewhere. This is where the [emoji-data.txt](http://www.unicode.org/Public/emoji/11.0/emoji-data.txt) file comes in. It is the canonical source of what emoji can pair with what. The stanza of lines of say `Emoji_Modifier_Base` are the emoji or emoji ranges that support skin tones (and gender) modifiers. This is a format between machine readable and prose that I like to call "machine attemptable". Because why not, I wrote [a python script to parse this into a JS const](https://github.com/DingoEatingFuzz/chrome-emoji-skin-tone-randomizer/blob/master/bin/save-emoji-modifier-bases.py).

This way, the array of all emoji that are skin tone eligible is generated and embedded into the final extension content script.

## Understanding nested ligatures

At this point it may seem like all that's left to do is write a regex to replace emoji that aren't followed by a skin tone with an emoji that has a skin tone. I thought this too, but there is a little thing called the [Zero-width Joiner](https://en.wikipedia.org/wiki/Zero-width_joiner). Remember that ligatures happen when a typeface declares a combination of unicode code points should be replaced by a single glyph. As should be expected, life isn't this simple. Sometimes (in emoji and in some languages) it is valid to have two code points next to each other as either a combined glyph or as separate glyphs. Consider this family: 👨👩👦👦. Now consider the same family as a single glyph: 👨‍👩‍👦‍👦. The only difference here is in the single glyph example, a zero-width joiner (zwj) has been inserted between each family member. These intricate glyphs can also be decomposed quite elegantly with JavaScript:

```js
const intricateEmoji = '👨‍👩‍👦‍👦'
const allTheParts = [...intricateEmoji] // [ '👨', '<zwj>', '👩', '<zwj>', '👦', '<zwj>', '👦' ]
```

But what happens when we introduce skin tones? Can we make mixed-race families? The answer is yes: 👨🏻‍👩🏿‍👦🏾‍👦🏽. This is achieved by having nested skin tone ligatures within larger family ligatures. The full set of unicode code points is:
```js
const family = [
  "👨", "🏻", // Fitz-1/2 father
  "‍<zwj>",
  "👩", "🏿", // Fitz-6 mother
  "‍<zwj>",
  "👦", "🏾", // Fitz-5 son
  "‍<zwj>",
  "👦", "🏽"  // Fitz-4 son
]
```

So this needs to be handled in the extension to make sure that if the original author of copy intended to have a family glyph, this extension doesn't come in and accidentally mangle it by injecting a skin tone where one isn't compatible

## Making a Chrome extension

At this point, all that was left to do was write the JS and regular expressions that actually did the text substitutions and call that code at the write time from within the Chrome extension. The write time to run the code is during the [`document_end`](https://github.com/DingoEatingFuzz/chrome-emoji-skin-tone-randomizer/blob/master/src/manifest.json#L18-L23) content script hook, and the write regex is [this unfortunate thing](https://github.com/DingoEatingFuzz/chrome-emoji-skin-tone-randomizer/blob/master/src/postprocess.js#L3).

Add the extension from the Chrome web store 👉 [Emoji Skin Tone Randomizer](https://chrome.google.com/webstore/detail/emoji-skin-tone-randomize/ohhjagdgpnjmffkbdmgocehijcppnicj).

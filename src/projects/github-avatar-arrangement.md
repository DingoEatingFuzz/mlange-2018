Github has these default avatars they [call identicons](https://blog.github.com/2013-08-14-identicons/) that are 5x5 grids with a single color. They are generated using a hashing function and a username as a seed. Despite the grid being 5x5, they are always symmetrical, so the grid is actually 3x5 with column 4 being the same as column 2 and column 5 being the same as column 1.

A 3x5 grid has only 15 squares, and a square is either on or off. It dawned on me one day that the total number of permutations isn't actually _that_ large. 2^15 = 32,768.

As a hobbyist generative artist, this screamed [small multiples](https://en.wikipedia.org/wiki/Small_multiple) to me.

## Generating an avatar

An avatar can be thought of as a 15 digit binary number, where each bit represents one of the fifteen squares in the 3x5 grid. Then the first two columns are reflected across the middle column.

```
avatar = 100 010 001 010 001

1 0 0 0 1
0 1 0 1 0
0 0 1 0 0
0 1 0 1 0
1 0 0 0 1
```

Using Processing (with Python instead of Java), this binary avatar can be turned into lovely rectangles using the following set of loops and bitwise operations:

```python
def avatar(seed, avatarSize = 50):
    paddingSize = floor(avatarSize * 0.05)
    tileSize = ceil(avatarSize * 0.9 / 5)

    noStroke()

    # Set a gray background
    fill(0, 0, 245)
    rect(0, 0, avatarSize, avatarSize, paddingSize, paddingSize, paddingSize, paddingSize)

    # Choose a randomish color for the avatar
    fill(random(255), random(25, 75), random(175, 225))

    pushMatrix()
    translate(paddingSize, paddingSize)

    for i in range(5):
        for j in range(3):
            # If the bit in this square's position in the seed int is flipped, then draw a square
            if seed & (1 << (i * 3 + j)):
                rect(tileSize * j, tileSize * i, tileSize, tileSize)
                # For the first two columns, also draw a square in the reflected column
                if j != 2:
                    rect(tileSize * (4 - j), tileSize * i, tileSize, tileSize)
    popMatrix()
```


## Generating all the avatars

Since generating an avatar has been reduced to a binary seed, generating all the avatars is as simple as iterating over all the binary values between `000 000 000 000 000` and `111 111 111 111 111`. Since binary is just a base 2 number, we can instead think of these seeds as base 10 numbers. This makes the range `0..32768`.

```python
for i in range(32768):
    avatar(i)
```

This will work for generating every single avatar, but I also wanted to see everything at once. I wanted the small multiples. Withouth thinking too hard, I just found a couple reasonable factors of 2^15 to make a nice arrangement. 2^7 &times; 2^8 = 2^15. Good enough!

```python
pushMatrix()
translate(50, 50)
for x in range(128):
    for y in range(256):
        pushMatrix()
        translate(23 * x, 23 * y)
        avatar(y * 128 + x, 22)
        popMatrix()
popMatrix()
save('tiles-full.png')
```

## Technology Used

- Processing
- Python

## The final arrangements

<div class="big-feature">
    <img src="https://raw.githubusercontent.com/DingoEatingFuzz/github-gravatars/master/github_gravatar/tiles-full.png" alt="Full arrangement, ordered">
</div>

_An ordered arrangement of all 32k avatars_

<div class="big-feature">
    <img src="https://raw.githubusercontent.com/DingoEatingFuzz/github-gravatars/master/github_gravatar_shuffle/tiles-full.png" alt="Full arrangement, shuffled">
</div>

_A shuffled arrangement of all 32k avatars_

---
title: 'Based Logs #17 - Reverse Z Theory'
description: 'Learning about reverse z'
date: '2024-07-06'
---

I'm back from my vacation so I'll slowly be picking up these blogs again hopefully. I have some other important real life things I need to focus for now on so new blogs may still be a bit scattered.

The primary game engine I currently work with ([s&box](https://sbox.game/)) recently added reverse z which I had no idea existed.

If you remember from my previous [depth buffer](https://matek.dev/blog/basedlogs-6/) post that depth values are mapped between `0.0` and `1.0`. The formula (`1/z`) is how we distribute these values.

<Img src="reg.jpg" caption="https://developer.nvidia.com/content/depth-precision-visualized" href="https://developer.nvidia.com/content/depth-precision-visualized" />

The ticks on the blue line visualize the distribution of values when using `1/z`. A lot of them end up needlessly bunched up at the near plane. It ends up being the case that we don't really need this extreme amount of precision towards the near plane. We definitely want more precision closer to the near plane as compared to the far plane... but not to that degree.

We can use a technique called "reverse z" which maps the near plane to `d=1` and the far plane to `d=0`. In this case `d` is the value stored in the depth buffer.

<Img src="zreverse.jpg" caption="https://developer.nvidia.com/content/depth-precision-visualized" href="https://developer.nvidia.com/content/depth-precision-visualized" />

We still achieve the precision we need at the near plane but also end up with a better distribution of values everywhere else.

This is a pretty high level overview but what interested me the most is I was suprised that graphics APIs don't behave like this by default. You essentially have a better distribution of values with the same level of performance. Maybe because it is overkill in most cases?

I'll consider implementing this for my engine in the future... but at this point it is too early and there are more important things to work on.

<Spotify src="track/7s2CpYr2U84BuQvs5p6ZSX?si=7f0a2d8f91ae4fef" />

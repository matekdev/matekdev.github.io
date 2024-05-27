---
title: 'Based Logs #6 - Depth Buffer'
description: 'Interesting facts about the depth buffer and early-z'
date: '2024-05-20'
---

The depth buffer (or z-buffer) stores the depth information for every single fragment. This information allows us to determine which fragments should be rendered in front of other fragments. The depth test is what facilitates this process. Imagine a two dimensional array where each entry is the depth value. If an incoming value is less than or equal to the current value, then we update the array with the incoming value (the depth test has passed).

GPUs support a feature called "early z" (or early depth testing). This allows for the depth test to run before the fragment shader runs. Whenever we know that a fragment isn't going to be visible we can discard the fragment. Fragment shaders tend to be expensive to run so this is one way to optimize the process. If you write to a fragment's depth value during the fragment shader we cannot perform "early z".

The way you can access the depth value is via `gl_FragCoord` inside the fragment shader. The`x` and `y` component represent the fragment's screen-space coordinates and the `z` component is the depth buffer's content.

The depth values are between `0.0` and `1.0`. These need to be compared to the values between the near and far plane. Therefore we can map the range using a formula. We however never use a linear distribution of values between `0.0` and `1.0`. This is because we care a lot more about the precision close to our camera versus far away. When we start to have precision issues we end up with "z-fighting".

Z-Fighting occurs when the fragments don't know which one should be rendered on top which causes the flickering you might have seen in games. This tends to occur in objects further away because we map our values in such a way that further away objects have less precision. We can solve z-fighting in the following ways.

1. You could manually adjust the objects so there is enough separation between them.
2. We can move the near plane as far as possible (however this could cause clipping of objects up close).
3. Use a high precision depth buffer... most depth buffers have a precision of 24 bits but some GPUs support up to 32 bit depth buffers (I imagine most due as this article might be slightly old?).

I'm going to need a good understanding of the depth buffer for when I go on and implement shadow mapping. Again, thanks to [LearnOpenGL](https://learnopengl.com/Advanced-OpenGL/Depth-testing) for the article as I have basically restated and summarized their information.

<Spotify src="track/7vQ8hT2jlA6RhxI4ZxISVd?si=9c1d7b94d5be477c" />

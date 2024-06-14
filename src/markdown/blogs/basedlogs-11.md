---
title: 'Based Logs #11 - Transparency in OpenGL'
description: 'Transparency and blending implementation for the Based Engine'
date: '2024-05-26'
---

There are two ways that transparent objects can exist in our scene. The first way is we could have a texture that has a portion that is completely transparent. The second way is we have a partially transparent texture that will mix its colours with what is behind it. The former can be considered transparency and the latter is blending (since we have to blend together multiple colours 🤯).

<Heading title="Transparency" />

This is pretty easy to implement since I use libraries to import models and textures for me. We need to make sure that when we detect a texture that has an alpha component that we use an alpha channel in OpenGL texture generation process.

```cpp
glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, data);
```

Then inside of our fragment shader all we need to do is discard the pixel if the alpha component is lower than the threshold we define.

```glsl
// If we have a texture, then use the texture "texture(TextureDiffuse, TexCoord)"
outputColor = HasTextures ? texture(TextureDiffuse, TexCoord) : vec4(MaterialData.Diffuse, 1.0);
// If the alpha component is less than 0.1 we do NOT show this fragment.
if(outputColor.a < 0.1)
    discard;
```

<Img src="trans.jpg" />

<Heading title="Blending" />

Blending occurs when a partially transparent texture needs to be combined with what is behind it. For instance, consider a red tinted glass window. The objects behind the red tinted glass window would have a red hue applied to them. OpenGL handles a lot of this for us by simply adding the following code during initialization.

```cpp
glEnable(GL_BLEND);
// You can read more about the various options at https://learnopengl.com/Advanced-OpenGL/Blending
glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
```

One issue that occurs however is when we have multiple transparent textures blending together. The problem is that the depth buffer doesn't care if the fragment has transparency or not. Which results in the depth test discarding the fragments.

<Img src="issue.jpg" />

The way we can solve this is using the [painter's algorithm](https://en.wikipedia.org/wiki/Painter%27s_algorithm). What we want to do is sort all of the models with transparency by their distance to the camera and render the furthest first.

1. Draw all regular objects first
2. Sort the transparent objects based on their distance to the camera
3. Draw the transparent objects in the sorted order

<Img src="final.jpg" />

We ideally don't want to sort objects since it'll cost us some performance (and it is being done on the CPU). It's something we can consider for the future but for now we have transparency and blending working.

<Spotify src="track/4EOkxdS9bRlpfzMFJy8qaV?si=b39f6af35da14b47" />

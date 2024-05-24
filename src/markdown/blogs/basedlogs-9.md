---
title: 'Based Logs #9 - Framebuffer'
description: 'Fun facts about the framebuffer'
date: '2024-05-24'
---

I touched upon framebuffers briefly in my previous blog because I spent multiple hours trying to write to write to a stencil buffer that didn't exist. Now, let's cover the [LearnOpenGL](https://learnopengl.com/Advanced-OpenGL/Framebuffers) section on them.

A default framebuffer is created and automatically configured when you create a GLFW window with OpenGL. You get a color buffer, depth buffer, and a stencil buffer. The Based Engine creates its own framebuffer so that way I can render the texture onto the ImGui window.

Now the framebuffer is a collection of buffers that are used for rendering (color, depth, stencil). You must have at least one colour attachment and you can optionally have a depth or stencil attachment as well (we found this out last blog!). I didn't realize not having a depth buffer was possible but interesting enough the PS1 actually didn't have a depth buffer at all.

One of the use cases for framebuffers is doing post processing effects. Essentially what you can do is take the texture that is generated from your framebuffer and map it onto the screen. Then, using a fragment shader you have access to the texture which allows you to do whatever you'd like to all the pixels that were rendered.

A simple fragment shader like this would invert all the pixel colors.

```glsl
void main()
{
    FragColor = vec4(vec3(1.0 - texture(screenTexture, TexCoords)), 1.0);
}
```

That's it, not much else to say. I skipped out on the details of setting up a framebuffer but it isn't too hard to check out my source code or check out the examples provided by [LearnOpenGL](https://learnopengl.com/Advanced-OpenGL/Framebuffers).

<Spotify src="track/7mykoq6R3BArsSpNDjFQTm?si=952caa3ddf974c4e" />

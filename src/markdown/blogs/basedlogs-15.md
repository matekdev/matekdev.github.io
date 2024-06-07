---
title: 'Based Logs #15 - DirectX 11'
description: 'Swapping graphics APIs'
date: '2024-06-06'
---

It has been five days since the last blog post which is unusual compared to the (mostly) daily posting. The reason for that is I have decided to swap to DirectX 11. As I was finishing up my shadow map implementation I realized that I wasn't really needing to interface with OpenGL anymore. I had setup the core structure of my engine and most of the work was either general programming work or GLSL shaders. If you don't know... nobody uses OpenGL anymore. The real options within the industry are either [Vulkan](https://www.vulkan.org/) or [DirectX 12](https://www.nvidia.com/en-us/geforce/technologies/dx12/). There is also [WebGPU](https://www.w3.org/TR/webgpu/) which looks to be the best cross platform solution... but its primary use case is for the web and it is still work in progress.

So why DirectX 11? I'm still not ready to tackle a graphics API like Vulkan or DirectX 12. The next best option is to pick something a bit more modern that will allow me to transition towards one of these APIs. Well, the nice thing about DirectX 11 is [D3D11On12](https://learn.microsoft.com/en-us/windows/win32/direct3d12/direct3d-11-on-12). This allows you to incrementally port an application from DirectX 11 to DirectX 12. So once I rewrite my entire engine to support DirectX 11 I'll get familiar with the API and [HLSL](https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl). Then, once I finally feel ready, I'll begin to the transition to DirectX 12. This transition point will happen much further down the line as compared to my OpenGL iteration. I'd like to tackle features such as deferred rendering, SSAO, and PBR.

At this current moment I have a basic DirectX 11 application setup with GLFW. I have ImGui correctly working and a basic triangle rendering. The next following steps will be...

1. Model importing
2. Camera implementation
3. Object picking
4. Lighting
5. Cube maps
6. Shadow mapping

I'm already getting some of the benefits of working with DirectX 11. The nice thing is that all of the packages can be directly imported into my program without having to setup any prior linking (since I'm on Windows). I've briefly touched the shading language as well and it supports features I found lacking in GLSL. For instance, you can't import any files in GLSL which started bloating my [main shader file](https://github.com/matekdev/based-engine-opengl/blob/main/shaders/model.frag).

I imagine I'll write some blogs for any new concept I encounter in DirectX 11 as I work towards the progress I previously had. I'm excited and I feel up to the task so far after working with OpenGL for a bit. I've also moved the [OpenGL version of my repo here](https://github.com/matekdev/based-engine-opengl).

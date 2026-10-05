---
name: 'Lean Engine'
git: 'https://github.com/matekdev/lean-engine'
skills: 'C++, OpenGL, ImGui, entt'
---

Lean Engine is a 3D OpenGL engine written in modern C++. It was my first real attempt at graphics programming. I worked through [LearnOpenGL](https://learnopengl.com/) and implemented each feature in the engine as I went.

It covers lighting, framebuffers, cubemaps, and shadow mapping. Once shadows were done, I moved the project to DirectX 11 as [Based Engine](/projects/based-engine/).

I blogged the whole way through in the [Based Logs](/blog/basedlogs-0/) series. Some highlights are [Shadow Mapping](/blog/basedlogs-14/), [RenderDoc](/blog/basedlogs-7/), and [Blinn-Phong](/blog/basedlogs-13/).

## Features

- Phong lighting, later upgraded to Blinn-Phong, with per-model materials
- Directional, point, and spot lights, with multiple of each in a scene
- Directional shadow mapping with slope-scaled bias and PCF
- Cubemap skybox
- Transparency/blending and back-face culling
- Scene rendered to a framebuffer and shown in an ImGui viewport
- Object picking through an ID render pass, with a stencil outline on the selected object
- Model loading with assimp
- Entity component system built on entt
- Editor UI: entity list, inspector, console, and ImGuizmo transform gizmos

<Img src="ex1.webp"  />

<Img src="ex2.webp"  />

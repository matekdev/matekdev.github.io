---
name: 'Based Engine'
git: 'https://github.com/matekdev/based-engine'
skills: 'C++, DirectX 11, PhysX, ImGui, entt'
---

Based Engine is a 3D DirectX 11 engine written in modern C++. It's my playground for graphics programming.

It picks up where [Lean Engine](/projects/lean-engine/) left off. After getting shadow maps working in OpenGL, I switched to DirectX 11 and rebuilt the renderer and engine from scratch, then integrated [PhysX](https://github.com/NVIDIA-Omniverse/PhysX) for physics. The long-term plan is to move to DirectX 12.

I wrote about the switch and what came after in the [Based Logs](/blog/basedlogs-15/) series.

## Features

- DirectX 11 renderer with HLSL shaders, with resources managed through ComPtr
- Blinn-Phong directional lighting
- Cubemap skybox with static environment reflections
- Scene rendered to a render target and shown in a docked ImGui viewport
- Textured model loading with assimp
- PhysX integration: static and dynamic rigid bodies, plus PhysX Visual Debugger support
- Object picking with PhysX raycasts, and gizmos to drag physics objects around live
- Entity component system built on entt
- Editor UI: entity list, inspector, console, and ImGuizmo transform gizmos

<Youtube id="lY5LsbUydl4" />

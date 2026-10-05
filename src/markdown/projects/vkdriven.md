---
name: 'VKDriven'
git: 'https://github.com/matekdev/vkdriven'
skills: 'C++, Vulkan, Slang, ImGui'
---

🚧 **Work in progress.** VKDriven is in early development, so expect things to change.

VKDriven is a Vulkan 1.3 renderer written in modern C++, built up one feature at a time. It's my third attempt at graphics programming after [Lean Engine](/projects/lean-engine/) and [Based Engine](/projects/based-engine/), and this time the end goal is GPU-driven rendering.

I'm writing about the progress in the [VKDriven](/blog/vkdriven-1/) blog series.

## Done so far

- Vulkan core following [How to Vulkan](https://www.howtovulkan.com/): dynamic rendering, synchronization2, buffer device address and bindless textures
- Slang shaders compiled to SPIR-V at runtime, with hot-reload
- glTF 2.0 scenes (Sponza) with GPU-generated mipmaps, one shared vertex/index buffer for the whole scene
- ImGui debug UI and a fly camera

## Planned features

- **PBR lighting:** HDR and tonemapping, Cook-Torrance BRDF, normal mapping, point and spot lights
- **Cascaded shadow maps** with PCF and texel snapping
- **GPU-driven rendering:** compute frustum culling and the whole scene in one indirect draw call
- **Two-pass Hi-Z occlusion culling**
- **Profiling:** per-pass GPU timings and case studies with Nsight / Radeon GPU Profiler

<Img src="ex1.webp" alt="VKDriven rendering Sponza" />

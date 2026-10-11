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
- PBR lighting: Cook-Torrance BRDF with metallic-roughness materials and normal mapping
- glTF 2.0 scenes (Sponza) with GPU-generated mipmaps, one shared vertex/index buffer for the whole scene
- HDR rendering with a tonemapping pass (AgX, ACES, Reinhard, Khronos PBR Neutral) and adjustable exposure
- Cascaded shadow maps: four cascades fit to the view frustum, with depth bias and PCF filtering
- Slang shaders compiled to SPIR-V at runtime, with hot-reload
- ImGui debug UI and a fly camera

## Planned features

- **Two-pass Hi-Z occlusion culling**
- **GPU-driven rendering:** compute frustum culling and the whole scene in one indirect draw call
- **Image-based lighting:** irradiance and prefiltered environment maps generated in compute shaders
- **Profiling:** per-pass GPU timings and case studies with Nsight / Radeon GPU Profiler

<Img src="ex1.webp" alt="VKDriven rendering Sponza" />

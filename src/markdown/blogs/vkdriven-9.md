---
title: 'VKDriven #9 - Notes'
description: 'Handwritten notes from studying for a rendering job'
date: '2026-11-06'
hidden: false
---

This entry is a bit different. I've been studying for a rendering job, and a lot of what I was going over is stuff I ran into while building VKDriven. So these are my handwritten notes, going roughly from the Vulkan side of things down to the GPU pipeline and PBR.

Most of the topics have their own entry if you want the longer version with code: [data and bindless textures](/blog/vkdriven-3/), [PBR](/blog/vkdriven-4/), [HDR and tonemapping](/blog/vkdriven-5/), [shadow mapping](/blog/vkdriven-6/) and [cascaded shadow maps](/blog/vkdriven-7/).

# Vulkan

<Img src="dynamic-rendering.webp" alt="Dynamic rendering: Vulkan 1.3 passes attachment data directly when recording commands, instead of creating a VkRenderPass and VkFramebuffer" />

<Img src="synchronization.webp" alt="Synchronization: pipeline barriers, semaphores and fences, and what each one waits on" />

<Img src="buffer-device-address.webp" alt="Buffer device address: asking Vulkan for a pointer to a buffer and using it like a pointer in the shader" />

<Img src="bindless-textures.webp" alt="Bindless textures: putting every texture in one large descriptor array that the shader indexes into" />

<Img src="push-constants.webp" alt="Push constants: a tiny block of data written into command buffers" />

# Shadows, depth and HDR

<Img src="shadow-cascades.webp" alt="Shadow cascades: splitting the camera view into slices with their own shadow maps, plus fixes for shimmering and shadow acne" />

<Img src="reverse-z.webp" alt="Reverse-Z: swapping depth to 1 to 0 for better float precision and less z-fighting" />

<Img src="hdr.webp" alt="HDR and tonemapping: mapping a wider range of lighting values into the range the monitor supports" />

# Performance and memory

<Img src="performance.webp" alt="Performance: frame time, comparing CPU and GPU timings with timestamp queries to find the bottleneck, and GPU profilers" />

<Img src="memory-allocation.webp" alt="Memory allocation: VMA handles the memory allocation for us" />

# GPU pipeline

<Img src="gpu-pipeline.webp" alt="The GPU pipeline from vertex and index data through the input assembler, vertex shader, tessellation and geometry, rasterization, fragment shader, depth and stencil tests, to output" />

# PBR

<Img src="pbr.webp" alt="PBR: energy conservation, reflection and refraction as specular and diffuse, how metallic changes the split, and the Fresnel effect" />

<Img src="brdf.webp" alt="The microfacet model and roughness, what a BRDF is, and Cook-Torrance with Lambert diffuse and a specular term split into distribution, geometry and Fresnel" />

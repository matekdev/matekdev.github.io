---
title: 'VKDriven #3 - Data'
description: 'Passing data'
date: '2026-10-02'
hidden: false
---

I think it's worthwhile to talk about all the different ways you can pass around data in Vulkan. The two kind of important questions to consider are...

1. How does the data get into memory that the GPU can read?
2. How does the shader find them?

# Transferring Data to GPU

## Staging buffer + `vkCmdCopyBuffer`

The fastest memory for the GPU usually isn't visible to the CPU, so the CPU writes into a buffer it can map (the staging buffer) and the GPU copies it into VRAM.

## Persistently mapped host-visible memory

Map the buffer once, keep the pointer, and `memcpy` into it every frame.

## Push constants

The bytes are recorded into the command buffer itself. The Vulkan spec guarantees at least 128 bytes.

## Images: staging buffer + `vkCmdCopyBufferToImage`

Images are stored in an opaque, tiled layout, so you can't `memcpy` pixels into them. The upload uses a staging buffer like before, but the image has to be transitioned into a layout the copy can write to, then into one that shaders can sample from:

1. Write the pixels into a staging buffer.
2. Transition the image to `TRANSFER_DST_OPTIMAL`.
3. `vkCmdCopyBufferToImage`.
4. Optionally generate mips with `vkCmdBlitImage`.
5. Transition the image to `SHADER_READ_ONLY_OPTIMAL`.

## In Summary

| Method | Use it for | How often the data changes | Size | Examples |
|---|---|---|---|---|
| Staging buffer + `vkCmdCopyBuffer` | Data that's written once and read many times | Once (at load) | Any | Vertices, indices, materials, transforms |
| Persistently mapped host-visible memory | Small data the CPU updates often | Every frame | Small (one copy per frame in flight) | Camera matrices, lights, time |
| Push constants | Tiny per-draw values, usually indices into other data | Every draw | 128 bytes guaranteed (often 256 on desktop) | Draw index, material index, buffer indices |
| Staging buffer + `vkCmdCopyBufferToImage` | Pixel data that shaders sample | Once (at load) | Any | Textures, environment maps |

# How the GPU Finds the Data

We need to tell the GPU how to find the data. Typically, the shader looks up the data through a descriptor or a pointer. A descriptor just being a way to define how the data is formatted and where it can be found.

## Vertex and index buffer bindings

The CPU binds the buffers with `vkCmdBindVertexBuffers` and `vkCmdBindIndexBuffer`. The input assembler then fetches each vertex and hands it to the vertex shader as inputs. The shader never sees the buffer itself.

```slang
struct VSInput { float3 Pos; float3 Normal; float2 UV; };
```

## Push constants

Push constants need no lookup at all: the shader reads them directly. Because they're so small, they usually carry indices or addresses that point at the real data.

```slang
[[vk::push_constant]] DrawConstants constants;
```

## Descriptors

A descriptor is a small record that describes a resource: which buffer or image it is, its size, and, for images, its format and layout. Shaders declare numbered slots, and the CPU binds descriptor sets that fill them.

```slang
[[vk::binding(0, 0)]] StructuredBuffer<Material> materials;
```

## Bindless descriptors

Put every resource into one large descriptor array and bind it once. The shader picks a resource by index at runtime, usually an index passed in a push constant.

```slang
[[vk::binding(1, 0)]] StructuredBuffer<Material> materialBuffers[];

Material m = materialBuffers[constants.materialBuffer][draw.materialIndex];
```

The first index picks the buffer, and the second picks the element in it. 

It's called "bindless" because you don't bind anything per draw. The array is bound once (per frame, or even once for the whole app), and each draw just passes indices.

## Buffer device address

Ask Vulkan for a buffer's 64-bit GPU address with `vkGetBufferDeviceAddress`, pass it in, and the shader uses it as a pointer. No descriptors are involved, and addresses can be stored inside other buffers.

```slang
Material m = constants.materials[draw.materialIndex];
```

## Summary

| | Vertex/index binding | Descriptors | Bindless | Device address |
|---|---|---|---|---|
| Staging + copy | ✅ | ✅ | ✅ | ✅ |
| Persistently mapped | ✅ (slower without ReBAR) | ✅ | ✅ | ✅ |
| Push constants | ❌ | ❌ | ❌ | ❌ (read directly) |
| Images | ❌ | ✅ | ✅ | ❌ |

This blog isn't too exciting and was partly AI generated mostly because I'm just listing a bunch of methods and definitions. Probably not very interesting but it's here as a resource if I ever need to look back.
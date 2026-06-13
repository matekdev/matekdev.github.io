---
title: 'Based Logs #22 - Prologue Redux'
description: 'Another attempt at learning graphics programming'
date: '2026-06-12'
---

I'm back at it again writing my own little renderer. Last time I was messing around with DX11 and ended up writing a basic renderer with some basic game engine functionality (such as integrating NVIDIA's PhysX). That was great but I found that two things held me back. Firstly, the thing about graphics programming is that the API you use doesn't really matter very much. It's the ability to understand and implement the graphics programming concepts. Secondly, I was distracted by implementing various game engine features and I found that I didn't spend enough time on the graphics programming concepts.

So here is how I'm going to change things up. I'm going to be using WebGPU as my graphics API since it's modern and has an extremely accessible API. I'm going to use TypeScript since it'll be a lot easier to write and iterate on the code. And now since the AI models have come a long way, I'll definitely be utilizing them to explain, learn, and implement graphics programming concepts.

The previous blogs were actually extremely helpful for me to learn and understand graphics programming concepts. I had an interview for a graphics programming role recently and absolutely killed it. I was able to explain core concepts of the graphics pipeline, how to implement various lighting techniques, and even more niche details such as early z (I didn't end up getting the job).

I won't be covering the basics of graphics programming since I covered that in previous blogs. Instead, it'll mostly be about how the WebGPU API differs and from there on out more advanced graphics programming concepts.

<Heading title="Bind Groups" />

Bind groups are a way to group together resources such as textures, buffers, and samplers that can be used in shaders. They are similar to descriptor sets in Vulkan and root signatures in DirectX 12.

```ts
// Create a bind group for our uniform buffer, it can only be used in the vertex shader
const bindGroupLayout = device.createBindGroupLayout({
	entries: [
		{
			binding: 0,
			visibility: GPUShaderStage.VERTEX,
			buffer: { type: 'uniform', hasDynamicOffset: true }
		}
	]
});
```

<Heading title="GPU Buffer Usage Flags" />

GPU buffer usage flags are WebGPU’s way of making buffer intent explicit. When a buffer is created, you must declare how it will be used, such as for vertex data, index data, uniforms, or copy operations. That gives the API enough information to validate commands and treat the buffer as the right kind of GPU resource.

<Heading title="Uniform Alignment Rules" />

GPUs expect predictable memory boundaries, this means that when you create uniform buffers, you need to ensure that the data is aligned.

<Heading title="Explicit Resource States" />

Before you push any data to the GPU, you need to explicitly declare the state of the resource. This is a bit different from older APIs where the driver would implicitly handle resource states for you. In WebGPU, you need to be explicit about when a resource is being read from or written to, and this helps the GPU optimize access to those resources.

<Heading title="Command Encoders" />

Both Vulkan and WebGPU use command buffers to record rendering commands. These are basically a way to batch up rendering commands and then submit them to the GPU for execution.

```ts
beginFrame(): { encoder: GPUCommandEncoder; view: GPUTextureView; depthView: GPUTextureView } {
  this.resizeCanvas();
  // Create a command encoder to record rendering commands
  const encoder = this.device.createCommandEncoder();
  const view = this.context.getCurrentTexture().createView();
  return { encoder, view, depthView: this.depthTexture!.view };
}

// ...

// Begin a render pass to start issuing draw calls
const renderPass = encoder.beginRenderPass({
  colorAttachments: [renderer.makeClearColorAttachment(view)],
  depthStencilAttachment: renderer.makeDepthAttachment(depthView),
});

// Issue draw calls here...

// ...

endFrame(encoder: GPUCommandEncoder): void {
  // Submit the command buffer to the GPU for execution
  this.device.queue.submit([encoder.finish()]);
}
```

I've abstracted some of the logic but the general idea is that you create a command encoder at the beginning of each frame, record your rendering commands, and then submit the command buffer at the end of the frame. This is a pretty standard way to do things in modern graphics APIs.

<Heading title="Per-object Uniforms" />

A per-object uniform is data that changes per draw, usually things like the transform matrix. In BasedGPU, every mesh instance writes its own model-view-projection matrix into a shared uniform buffer, and dynamic offsets let the renderer select the correct slice for each draw call. This way, we can efficiently manage per-object data without needing a separate buffer for each instance, which is crucial for performance when rendering many objects.

<Heading title="WebGPU Shading Language" />

We use WGSL (WebGPU Shading Language) for our shaders, which is a modern shading language designed specifically for WebGPU. It has a syntax similar to Rust and is designed to be safe and efficient. Here's a simple vertex and fragment shader that transforms vertex positions and passes through vertex colors:

```wgsl
struct VertexInput {
  @location(0) position: vec2f,
  @location(1) color: vec3f,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) color: vec3f,
};

struct ObjectUniform {
  modelViewProjection: mat4x4f,
};

@group(0) @binding(0) var<uniform> objectUniform: ObjectUniform;

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.position = objectUniform.modelViewProjection * vec4f(input.position, 0.0, 1.0);
  output.color = input.color;
  return output;
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  return vec4f(input.color, 1.0);
}
```

It's pretty clean and straightforward. You can see how much more typed and structured it is compared to older shading languages, which is a big improvement for readability and maintainability.

<Heading title="Conclusion" />

I've setup the basic structure of the renderer and have a simple triangle being rendered to the screen. You'll notice I skipped over a lot of the details, but, that's because I've covered a lot of the basics in previous blogs. The next steps will be to load some models instead of hardcoding a triangle.

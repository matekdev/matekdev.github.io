---
title: 'Based Logs #23 - Models'
description: 'Loading and rendering some models'
date: '2026-06-13'
hidden: true
---

Let's get some models and base color textures loaded and rendered. For this, I'm going to be using the glTF 2.0 format since it's a modern and widely supported format for 3D models. I could use `.fbx` since the company I work for owns the format... but let's give glTF a try.

I'm not going to talk about the loading process much since this is where AI really shines. Not to mention there are TypeScript libraries available that can load glTF models for you. There isn't much to gain writing my own glTF loader and I can just hand off a lot of the work to AI while I focus on the rendering side of things.

The really nice thing about glTF is that a `.glb` file is just a single file that contains all the data for the model, including geometry, materials, and textures. This makes it really easy to load and manage models in your application. The other benefit of the glTF format is that it supports PBR materials out of the box, so when we eventually get to implementing PBR rendering, we'll already have the material data we need.

In order to get base color textures working we needed to add a new bind group for the material data.

```ts
const materialBindGroupLayout = device.createBindGroupLayout({
	entries: [
		{
			binding: 0,
			visibility: GPUShaderStage.FRAGMENT,
			sampler: { type: 'filtering' }
		},
		{
			binding: 1,
			visibility: GPUShaderStage.FRAGMENT,
			texture: { sampleType: 'float' }
		}
	]
});
```

Then when rendering our model, we set up and send the material data via the new bind group. The first entry is the sampler for the material's base color texture and the second entry is the texture itself.

Once that is done we consume the sampler and texture in the shader.

```rust
struct VertexInput {
  @location(0) position: vec3f,
  @location(1) normal: vec3f, // Unused for now
  @location(2) tangent: vec4f, // Unused for now
  @location(3) uv: vec2f,
  @location(4) color: vec4f,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
  @location(1) uv: vec2f,
};

struct ObjectUniform {
  modelViewProjection: mat4x4f,
};

@group(0) @binding(0) var<uniform> objectUniform: ObjectUniform;
@group(1) @binding(0) var baseColorSampler: sampler; // Sampler for the base color texture
@group(1) @binding(1) var baseColorTexture: texture_2d<f32>; // Base color texture

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.position = objectUniform.modelViewProjection * vec4f(input.position, 1.0);
  output.color = input.color;
  output.uv = input.uv;
  return output;
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  // Sample the base color texture using the UV coordinates and return the final color
  return textureSample(baseColorTexture, baseColorSampler, input.uv);
}
```

<Img src="model.jpg"  />

<YoutubeMusic src="PBmtJvIcFXI" />

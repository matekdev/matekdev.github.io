---
name: 'Node RAPIDS'
git: 'https://github.com/rapidsai/node'
skills: 'C++, TypeScript, CUDA'
---

During my internship at NVIDIA, I worked on [Node RAPIDS](https://github.com/rapidsai/node), a set of Node.js native addons for GPU-accelerated data science libraries. The goal was to expose RAPIDS functionality through JavaScript, so users could work with GPU-backed data without writing CUDA directly.

Most of my work involved adding bindings for [cuDF](https://github.com/rapidsai/cudf). That meant defining the TypeScript API, wiring calls through the C++ addon layer, and then invoking the underlying cuDF/CUDA implementation. I was usually working across the full binding path, so changes had to line up cleanly between TypeScript, C++, and the native GPU library.

<Heading title="Blazing SQL" />

In the second half of the internship, I worked on bindings for Blazing SQL, which brought a GPU-accelerated SQL engine into the Node RAPIDS stack. This included shaping the JavaScript-facing API and connecting it to the native execution layer. I wrote more about the implementation details in a [Blazing SQL blog post](https://matek.dev/blog/node-rapids-blazing-sql/).

<Youtube id="-llIzlx7a-U" />

<Youtube id="rH7Wxn5Yr_A" />

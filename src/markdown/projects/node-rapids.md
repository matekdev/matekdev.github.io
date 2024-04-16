---
name: 'Node RAPIDS'
git: 'https://github.com/rapidsai/node'
skills: 'C++, TypeScript, CUDA'
---

During my internship at NVIDIA, I had the chance to work on [Node RAPIDS](https://github.com/rapidsai/node). It is a collection of Node.js native addons that provide access to GPU-accelerated data science libraries. Essentially, it allows data scientists to skip learning CUDA and instead use the JavaScript interface to accelerate data science operations on the GPU. A significant portion of my contributions involved writing bindings to the [cuDF](https://github.com/rapidsai/cudf) library. This process included writing the TypeScript interface, translating the call into the C++ layer, and finally invoking the cuDF and CUDA layers.

<Heading title="Blazing SQL" />

Towards the latter half of my internship, I was tasked with setting up bindings for Blazing SQL. I have a blog post discussing the implementation details of the [Blazing SQL library here](https://matek.dev/blog/node-rapids-blazing-sql/). Essentially, we integrated a GPU-accelerated SQL engine with Node.js.

<Youtube id="-llIzlx7a-U" />

<Youtube id="rH7Wxn5Yr_A" />

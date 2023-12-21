---
title: 'Node RAPIDS'
git: 'https://github.com/rapidsai/node'
skills: 'C++, TypeScript, CUDA'
---

During my internship at NVIDIA I had a chance to work on [Node RAPIDS](https://github.com/rapidsai/node). It is a collection of Node.js native addons that give access to GPU accelerated data science libraries. Essentially it allows data scientists to skip learning CUDA and instead use the JavaScript interface to GPU accelerate data science operations. A large part of my contributions involved writing bindings to the [cuDF](https://github.com/rapidsai/cudf) library. This involved writing out the TypeScript interface, then translating the call into the C++ layer, and finally, calling the cuDF and CUDA layers.

<Heading title="Blazing SQL" />

Towards the later half of my internship I was tasked with setting up bindings for Blazing SQL. I have a blog post talking about the implementation details of the [Blazing SQL library here](https://matek.dev/blog/node-rapids-blazing-sql/). Essentially, we took a GPU accelerated SQL engine and hooked it up to Node.js.

<Youtube id="-llIzlx7a-U" />

<Youtube id="rH7Wxn5Yr_A" />

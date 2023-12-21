---
title: 'Node RAPIDS'
git: 'https://github.com/rapidsai/node'
skills: 'C++, TypeScript, CUDA'
---

During my internship at NVIDIA I had a chance to work on [Node RAPIDS](https://github.com/rapidsai/node). It is a collection of bindings that give access to GPU accelerated data science libraries. Essentially it allows data scientists to skip learning CUDA and instead use the JavaScript interface to GPU accelerate data science operations.

<Heading title="Bindings" />

A large part of my contributions involved writing bindings to the [cuDF](https://github.com/rapidsai/cudf) library. This involved the following...

1. Writing the TypeScript definitions that users of Node RAPIDS would interface with.
2. The TypeScript would call into our native Node.js C++ layer which would translate the parameters.
3. The C++ layer would call into cuDF and CUDA and propagates the results upwards to the TypeScript layer.

This enabled users to take advantage of GPU accelerated data science operations by just simply writing some JavaScript.

<Heading title="Blazing SQL" />

I have a blog post talking about the implementation details of the [Blazing SQL](https://matek.dev/blog/node-rapids-blazing-sql/) library here. Essentially, we took a GPU accelerated SQL engine and hooked it up to Node.js.

<Youtube id="-llIzlx7a-U" />

<Youtube id="rH7Wxn5Yr_A" />

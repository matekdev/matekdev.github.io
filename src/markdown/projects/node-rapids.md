---
name: 'Node RAPIDS'
git: 'https://github.com/rapidsai/node'
skills: 'C++, TypeScript, CUDA'
---

During my internship on NVIDIA's RAPIDS data visualization team, I worked on [Node RAPIDS](https://github.com/rapidsai/node). It's a set of Node.js native addons that bring the RAPIDS GPU-accelerated data science libraries to JavaScript. Until then, RAPIDS was mostly only usable from Python.

What I worked on:

- Bindings for [cuDF](https://github.com/rapidsai/cudf), from the TypeScript API down through the C++ native layer
- The [SQL module](https://github.com/rapidsai/node/tree/7fb887c59dd5ff4b7dc023630ed0d8ea7efe5509/modules/sql), which binds the [BlazingSQL](https://github.com/BlazingDB/blazingsql) GPU SQL engine to Node.js
- Multi-GPU queries, with one worker process per GPU communicating over UCX
- GPUDirect Storage support, loading data from disk straight into GPU memory

<Heading title="Querying Wikipedia" />

As a demo for the SQL module, we loaded all of English Wikipedia (~16 GB) and ran SQL queries over it from Node.js. A full scan took ~40 seconds on two GPUs, and ~14 seconds once GPUDirect Storage was in. I wrote about how it all works [in this post](/blog/node-rapids-blazing-sql/).

<Youtube id="rH7Wxn5Yr_A" />

<Youtube id="-llIzlx7a-U" />

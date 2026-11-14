---
title: 'VKDriven #10 - More notes'
description: 'A second round of handwritten notes, this time on GPU driven rendering, culling, SSAO and transparency'
date: '2026-11-14'
hidden: false
---

A follow up to the [last set of notes](/blog/vkdriven-9/). I kept studying for the rendering interview and wrote up a few more topics. These ones are mostly about things VKDriven doesn't do yet, so there isn't an older entry to point to for them.

# GPU driven rendering

<Img src="gpu-driven-rendering.webp" alt="GPU driven rendering: upload vertex, index and material data to GPU buffers, fill an indirect buffer with where each mesh starts and ends, record one indirect draw call that points to it, and use a bounding sphere per mesh with the camera data to filter what gets drawn, so the GPU issues the draw calls" />

<Img src="gpu-culling.webp" alt="GPU culling: frustum culling skips anything outside the frustum, occlusion culling skips objects hidden behind others, and doing it on the CPU makes occlusion culling tricky because there is no depth buffer there" />

# SSAO

<Img src="ssao.webp" alt="SSAO darkens creases, corners and the spots where objects touch by checking the depth buffer around each pixel, the more nearby geometry blocks it the darker it gets" />

# Transparency

<Img src="transparency.webp" alt="Transparency: objects have to be sorted back to front for blending to come out right, and alpha testing either keeps or fully discards a pixel, which disables early-z" />

---
title: 'VKDriven #1 - Vulkan'
description: 'Let us try Vulkan again...'
date: '2026-09-26'
hidden: true
---

I tried Vulkan a couple years ago and completely hated it. Partly because I was brand new to graphics programming, but also, I was shocked that a modern API would require you to write a thousand lines to render a simple triangle. I obviously understand why it's so verbose, but still, a thousand lines? I gave up and decided to start with OpenGL which ended up being the right choice.

So I'm back again with my graphics programming journey hopefully here to make more progress than my last two attempts [Lean Engine](https://matek.dev/projects/lean-engine/) and [Based Engine](https://matek.dev/projects/based-engine/). I'm still proud of those projects because they laid out the fundamentals of graphics programming. To the point where I had an interview earlier this year at [AMD](https://www.amd.com/en.html) for a graphics programming job that went beyond well. I didn't get the job, but I was able to flawlessly answer every single graphics programming question they threw at me.

Anyways, I'm here to continue on my graphics programming journey once again this time with Vulkan. What's different about this time?

- Vulkan 1.3 is available and way less verbose
- I'm familiar with a lot of graphics programming concepts
- AI has taken over programming

At this point if I wanted to I could probably vibe code my way to a Vulkan rendering engine. However, I won't be doing that. Similar to my previous approaches I'll be writing blogs about various concepts in order to solidify my learning. I actually find those previous blogs as extremely good interview prep in case I forgot some previous concepts. Will I completely avoid using AI? Of course not. It's an amazing tool to learn and research, alongside just getting rid of headaches like setting up a C++ project.

I'll be using https://www.howtovulkan.com as my initial guide to getting started with Vulkan. From there I'll branch out and again implement various types of different graphics programming concepts.

You can find the repo for [VKDriven here](https://github.com/matekdev/vkdriven). Can I just say how much it is a delight to just have AI handle the generation of a C++ project? I was up and running within a couple of minutes.

# Vulkan

I've previously tried Vulkan a few years ago and it remains to be an extremely verbose API. I can't really fault the developers because they designed it with that intention. It allows the developer to define practically everything, including building out their own abstraction in-case people like me complain about how verbose it is.

Vulkan 1.3 is overall a lot nicer. There are a thing things it introduces which significantly cuts down on the amount of total lines. I followed the tutorial mentioned above and had something rendering in a couple of days.

<Img src="vkdriven-1.webp" alt="Three colorful monkey head renders" />

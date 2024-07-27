---
title: 'Based Logs #18 - Hiatus'
description: 'Taking a bit of a break'
date: '2024-07-27'
---

I've been primarily focused on some other projects in my life and I haven't had the time to work on the engine with my full attention. What is even worse is that [Facepunch has announced another s&box gamejam that started today!](https://x.com/s8box/status/1817208144210112617) The prize pool has doubled and since I was apart of the team that won the last one... it makes sense to dedicate my full priority on this gamejam. I'm going to see if I can do some shader work in HLSL for the game we plan to work on. It would be nice to gain some more experience since a majority of my time has been spent in C++ and not writing shaders.

As a minor update I managed to get model and texture loading implemented on the DirectX 11 version of my engine. There is also just a lot of general cleanup I've done which has really made the codebase quite nice to work with. I mean look at my render loop... I feel like it is extremely readable.

```cpp
void Application::Run() const
{
    while (!glfwWindowShouldClose(_glfwWindow))
    {
        _renderer->PreRender();

        _scene->Render();

        _renderer->BindBackBuffer();
        DrawPanels();

        _renderer->PostRender();

        glfwPollEvents();
    }
}
```

One area where my code base started to deteriorate last time around is when I added shadow mapping. I found that my `_scene->Render();` method began to explode in size because of having to render the scene objects multiple times. I'm wondering if implementing deferred rendering could potentially help with that abstraction.

<Img src="progress.jpg" caption="Classic hamster model loaded..." />

<Spotify src="track/0DXi34kEIXj6YPxrEfsFa7?si=b9f13819b8d645a7" />

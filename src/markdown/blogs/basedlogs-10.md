---
title: 'Based Logs #10 - Back-face culling in OpenGL'
description: 'Learning about back-face culling'
date: '2024-05-26'
---

We can discard polygons that are not visible from the camera using the process of back-face culling. Each polygon within our scene has a front side and a back side. If we can't see the back side of the polygon what is the point of sending that data through the render pipeline?

We use "winding order" as a way to determine whether or not the side of a polygon we are looking at is the front or the back.

<Img src="winding-order.jpg" caption="LearnOpenGL" href="https://learnopengl.com/Advanced-OpenGL/Face-culling" />

The triangle on the left is defined as clockwise (CW) and the triangle on the right is counter-clockwise (CCW). OpenGL uses this information to determine whether or not your triangle is front-facing or back-facing. OpenGL by default considers CCW vertices as front-facing triangles. It's important to note that if you are importing models the winding order is defined in the model data.

Each triangle should have a vertex ordering as if it was facing you. The winding order is calculated at the rasterization stage (after the vertex shader has ran) and so the vertices are seen as if they were from the viewer's point of view. This allows us to cull (or discard) non-visible faces.

To enable it in OpenGL we just add the following in the initialization code. In my case I set my winding order to be CW since a lot of the models I use are exported from [Blender](https://www.blender.org/).

```cpp
glEnable(GL_CULL_FACE);
glCullFace(GL_FRONT);
glFrontFace(GL_CW);
```

There are significant performance gains to using this technique but I don't really have a way to measure them since none of the scenes in my engine are very complex. However, I can show you the result on a model when back-face culling is enabled.

<Img src="before.jpg" caption="Outside view of the cube" />

<Img src="after.jpg" caption="Inside view of the cube" />

<YoutubeMusic src="3_aDQnA0qTw" />

---
title: 'Based Logs #1 - OpenGL Object Picking'
description: 'OpenGL object picking made easy'
date: '2024-05-13'
---

I'm working on an ["engine" with the primary goal of implementing various graphics features](https://github.com/matekdev/based-engine-opengl). I wanted the ability to click on objects within my scene and select them. You could normally do this with ray casting but I don't care to implement bounding boxes for a purely graphical engine.

I ended up implementing the method described by this [blog post](https://www.opengl-tutorial.org/miscellaneous/clicking-on-objects/picking-with-an-opengl-hack/). It works great but I also found the blog post mentioning calls to functions that are not needed at all.

<Heading title="How it works" />

1. Give each object within the scene a unique colour based on an identifier of your choice.
2. We can then use [glReadPixels](https://registry.khronos.org/OpenGL-Refpages/gl4/html/glReadPixels.xhtml) to see which colour our mouse is over.
3. Then we convert the colour back to the identifier and we know which object is being clicked on.

<Heading title="Implementation" />

<Heading title="Shaders" h="h3" />

We will need to write some custom shaders for this process. The vertex shader should mimic your regular camera perspective.

```glsl
// Vertex shader
#version 330 core
layout(location = 0) in vec3 aPos;

uniform mat4 ModelMatrix;
uniform mat4 CameraMatrix;

void main() {
    gl_Position = CameraMatrix * ModelMatrix * vec4(aPos.x, aPos.y, aPos.z, 1.0);
}
```

The fragment shader should take in a colour and render the object with the given colour.

```glsl
// Fragment shader
#version 330 core

out vec4 FragColor;

uniform vec3 PickingColor;

void main() {
    FragColor = vec4(PickingColor, 1.0f);
}
```

<Heading title="Code" h="h3" />

I'm going to cover partial code implementation details but if you want to [view the repo you can check it out here](https://github.com/matekdev/based-engine-opengl/tree/b145919ebc4a1e5e08883b53e6cedeaf7a73867f).

We are going to be writing to a custom frame buffer. If you don't know anything about them then I suggest reading about them over at [LearnOpenGL](https://learnopengl.com/Advanced-OpenGL/Framebuffers). In my case I already use a custom frame buffer for my main scene because I draw my scene to an ImGui panel.

We are going to need another frame buffer that is dedicated to the object picking process.

```cpp
// Bind our picking buffer so we can write to it.
_pickingBuffer.Bind();

// Clear the background to white, this is important since we colour our objects
// starting as black and then move onto lighter colours.
glClearColor(1.0f, 1.0f, 1.0f, 1.0f);
glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

// Loop over all the objects and render them with the new shader.
auto group = Scene::ActiveScene->Registry.view<ModelComponent, InfoComponent>();
for (auto entity : group)
{
    auto &info = group.get<InfoComponent>(entity);

    // EncodeId(...) is where all the magic happens... I'll cover it below.
    _pickingShader.Bind();
    _pickingShader.SetVec3(Shader::PICKING_COLOR, _pickingBuffer.EncodeId(info.Id));

    auto &model = group.get<ModelComponent>(entity);
    model.Render(_pickingShader);
}

// Get the position of our mouse.
auto [mouseX, mouseY] = ImGui::GetMousePos();
mouseX -= _viewPortBounds[0].x;
mouseY -= _viewPortBounds[0].y;
glm::vec2 viewportSize = _viewPortBounds[1] - _viewPortBounds[0];
mouseY = viewportSize.y - mouseY;

// Check if our mouse is within bounds of the ImGui panel.
if (mouseX >= 0 && mouseY >= 0 && mouseX < (int)viewportSize.x && mouseY < (int)viewportSize.y)
{
    // Decode the pixel back into our id and find the object.
    auto id = _pickingBuffer.DecodePixel(mouseX, mouseY);
    auto it = std::find_if(std::begin(group), std::end(group), [&](const auto &entity)
                            {
                            auto &info = group.get<InfoComponent>(entity);
                            return info.Id == id; });
    if (it == std::end(group))
        Scene::ActiveScene->SelectedEntity.reset();
    else
        Scene::ActiveScene->SelectedEntity = *it;
}

_pickingBuffer.Unbind();
```

```cpp
// Convert the object id to the colour that we pass to our shader.
glm::vec3 FrameBuffer::EncodeId(int id)
{
    return glm::vec3(
        static_cast<float>((id & 0x000000FF) >> 0) / 255.0f,
        static_cast<float>((id & 0x0000FF00) >> 8) / 255.0f,
        static_cast<float>((id & 0x00FF0000) >> 16) / 255.0f);
}

// Given the x and y position of our mouse, check the colour we are
// hovering over with our mouse. We can then decode this colour back into
// the id of our object.
int FrameBuffer::DecodePixel(float x, float y)
{
    std::array<unsigned char, 4> byte;
    glReadPixels(x, y, 1, 1, GL_RGBA, GL_UNSIGNED_BYTE, byte.data());
    auto id = byte[0] + byte[1] * 256 + byte[2] * 256 * 256;
    return id != 0x00ffffff ? id : -1;
}
```

The original blog posts mentions this but there is obviously a fixed number of colours you can encode. This is a hobby "engine" so we don't really care about that limitation. It is also worth while to mention that we only want to perform this whenever the user left clicks. Since we are re-rendering our entire scene a second time this could cause performance problems.

<Spotify src="track/1b5H59SJ7SF8dC0qguiWRR?si=cd675f03b30c433c" />

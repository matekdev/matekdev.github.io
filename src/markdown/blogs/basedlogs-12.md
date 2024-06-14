---
title: 'Based Logs #12 - Cubemaps in OpenGL'
description: 'Adding support for cubemaps and skyboxes'
date: '2024-05-28'
---

A cubemap is a cube... with six different textures. We can sample parts of the texture using a direction vector to implement effects like reflection mapping (environment mapping). The physical representation of a cubemap is a skybox. That large environmental background you might see in some games that you can never reach.

<Heading title="Skybox" />

A skybox is just a cube with textures mapped to the inside parts. You can check out my repo for any details relating to setting that part up. The unique part is that we need to render the skybox in such a way that it is always centered around the camera. We will need some new shaders for this.

```cpp
#version 330 core

layout(location = 0) in vec3 aPos;

out vec3 TexCoords;

uniform mat4 CameraViewMatrix;
uniform mat4 CameraProjectionMatrix;

void main() {
    gl_Position = CameraProjectionMatrix * CameraViewMatrix * vec4(aPos, 1.0);
    TexCoords = aPos;
}
```

and the fragment shader...

```glsl
#version 330 core

in vec3 TexCoords;

out vec4 FragColor;

uniform samplerCube SkyBoxTexture;

void main() {
    FragColor = texture(SkyBoxTexture, TexCoords);
}
```

The data we pass to the uniform `CameraViewMatrix` is where the trick lies. We can remove the translation section of a transformation matrix by taking the upper-left of a 3x3 matrix from the 4x4 matrix. This removes all translations but keeps the rotation transformations for when the camera rotates. This gives the effect that the skybox is infinitely away.

```cpp
_skyboxShader.SetMat4(Shader::CAMERA_VIEW_MATRIX, glm::mat4(glm::mat3(_camera.GetViewMatrix())));
```

There is an optimization we can make however since we know that the skybox should always be rendered in the background. We don't want to waste time performing the depth test on an object that should always be the furthest thing away from the camera.

We need to trick the depth buffer into thinking it has the maximum depth value of `1.0`. I'm going to reference the LearnOpenGL page since I think it does a good job explaining this trick.

_"In the coordinate systems chapter we said that perspective division is performed after the vertex shader has run, dividing the gl_Position's xyz coordinates by its w component. We also know from the depth testing chapter that the z component of the resulting division is equal to that vertex's depth value. Using this information we can set the z component of the output position equal to its w component which will result in a z component that is always equal to 1.0, because when the perspective division is applied its z component translates to w / w = 1.0"_

The vertex shader should look like...

```glsl
#version 330 core

layout(location = 0) in vec3 aPos;

out vec3 TexCoords;

uniform mat4 CameraViewMatrix;
uniform mat4 CameraProjectionMatrix;

void main() {
    vec4 pos = CameraProjectionMatrix * CameraViewMatrix * vec4(aPos, 1.0);
    gl_Position = pos.xyww;
    TexCoords = aPos;
}
```

<Img src="skybox.jpg" />

<Heading title="Reflection mapping" />

Now let's use the cubemap in order to implement reflection mapping. The idea is actually really similar [specular lighting](https://matek.dev/blog/basedlogs-2/#Specular) which we covered a bit ago.

<Img src="reflection.jpg" caption="LearnOpenGL" href="https://learnopengl.com/Advanced-OpenGL/Cubemaps" />

- `I` is the view direction which we can calculate using the `CameraPosition` and `FragPosition`
- `N` is the normal
- `R` is the result we want

If you remember from our specular lighting implementation we can use the built-in `reflect(...)` GLSL function.

```glsl
vec4 CalculateCubeMapReflection() {
    vec3 I = normalize(FragPosition - CameraPosition);
    vec3 R = reflect(I, normalize(Normal));
    return vec4(texture(SkyBoxTexture, R).rgb, 1.0);
}

void main() {
    vec4 outputColor = vec4(0.0);
    outputColor = HasTextures ? texture(Texture0, TexCoord) : vec4(MaterialData.Diffuse, 1.0);
    if(outputColor.a < 0.01)
        discard;

    outputColor *= CalculateLighting();

    // Combine together the result of our lighting and the reflection the cubemap produces.
    outputColor = mix(outputColor, CalculateCubeMapReflection(), 0.3);

    FragColor = outputColor;
}
```

<Img src="result.jpg" />

The result looks great for how simple the implementation is.

<Spotify src="track/2mwQngo1HlX5mftxYcM48a?si=fdf7896e67714ca5" />

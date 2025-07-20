---
title: 'Based Logs #3 - Model Materials & Light Properties'
description: 'Adding model materials and light properties to the Based Engine'
date: '2024-05-16'
---

Last time around we added [Phong Lighting](https://matek.dev/blog/basedlogs-2/) which is a combination of ambient, diffuse, and specular properties. This time around we will be adding the option to change these instead of having hard coded values in our shader.

We can define the following structs in our fragment shader and then populate them with values that are stored on the component.

```glsl
struct Material {
    vec3 Ambient;
    vec3 Diffuse;
    vec3 Specular;
    float Shininess;
};

struct Light {
    vec3 Position;
    vec3 Ambient;
    vec3 Diffuse;
    vec3 Specular;
};

uniform Material MaterialData;
uniform Light LightData;
```

The changes to the shader are pretty simple. Instead of using the hard coded values we should be instead referencing the uniform structs we defined.

```glsl
// ambient (before)
float ambientStrength = 0.1;
vec3 ambient = ambientStrength * LightColor;

// ambient (after)
vec3 ambient = LightData.Ambient * MaterialData.Ambient;
```

Here is an example of a gray cube with a light that has a blue specular applied.

<Img src="lighting-materials.jpg" />

I don't have anything else to add... these were pretty minimal changes but you can create some pretty interesting lighting scenes already.

<YoutubeMusic src="eU5PVFjsQG8" />

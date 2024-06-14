---
title: 'Based Logs #2 - Phong Lighting in OpenGL'
description: 'Initial lighting implementation in the Based Engine'
date: '2024-05-15'
---

Phong lighting is composed of three different parts

1. Ambient
2. Diffuse
3. Specular

<Heading title="Ambient" />

Ambient light is a distant light that is applied to every single object in the world equally. We can give our light source a colour and multiple it by the colour of our object.

```glsl
uniform vec3 LightColor;

void main()
{
    vec4 outputColor = vec4(1.0);

    float ambientStrength = 0.1;
    vec3 ambient = ambientStrength * LightColor;

    outputColor *= vec4(ambient, 1.0);
    FragColor = outputColor;
}
```

<Heading title="Diffuse" />

Diffuse lighting is the directional impact a light has on an object. The further away the light, the less of an impact it has on the object. There are three pieces of information we will need to calculate this lighting.

1. The position of the light source
2. The fragment's position
3. The normal vector of the vertex's surface

The position of the light source is simple since I have an [entire component already dedicated for it already](https://github.com/matekdev/based-engine-opengl/blob/a3a2af2d819c20944022ec3316e4019ade4f15ea/src/component/transform_component.hpp#L8). The fragment's position is already passed to my shader... but, since lighting calculations are done in world space (in our case) we have to multiply the positions by our model matrix. The normals would be typically calculated by taking the cross product. However, since I use model importing they are defined in the model format. Again, all lighting calculations are done in world space, these need to be converted as well. We use what is called a ["normal matrix"](http://www.lighthouse3d.com/tutorials/glsl-tutorial/the-normal-matrix/) to achieve this. I don't know the details but it is the following `mat3(transpose(inverse(ModelMatrix)))`.

```glsl
// Make sure to normalize everything before performing calculations!!
vec3 normal = normalize(Normal);

// The light direction is simply the light position subtracted by the frag position.
vec3 lightDirection = normalize(LightPosition - FragPosition);

// We can use the dot product to determine the strenght of our light.
// The definition I like to use for the dot product is "how much does one vector go in the direction of another".
// If the vectors point in a very similar direction the result is 1... if they are completely perpendicular it's 0.
// The dot product can end up negative (if the two vectors point in complete opposite directions) so we want to clamp it to 0 as well.
float diff = max(dot(normal, lightDirection), 0.0);
vec3 diffuse = diff * LightColor;

vec3 lightResult = ambient + diffuse;
```

<Heading title="Specular" />

Specular lighting is the lighting produced based on the reflective properties of the surface. We actually uses a lot of the same pieces of information as diffuse but we also consider the direction the camera is looking at the object.

<Img src="specular_diagram.jpg" caption="Diagram from LearnOpenGL" href="https://learnopengl.com/Lighting/Basic-Lighting" />

1. We have the light direction which we calculated by taking the position of the light and subtracting the fragment position
2. The normal vector is given to us via importing the model
3. We need the view direction which we can calculate by taking the position of the camera and subtracting the fragment position

```glsl
float specularStrength = 0.5;
vec3 viewDirection = normalize(CameraPosition - FragPosition);

// We calculate the reflection direction which is the orange depicted in the diagram.
// The light direction is negative  because it points from the fragment towards the light source.
vec3 reflectionDirection = reflect(-lightDirection, normal);

// Using the dot product we can get the strength by taking our view direction and reflection direction.
// Again, we make sure to clamp it to at least 0.0 so it isn't negative.
// In this case LearnOpenGL raises it to a power of 32 so you can see the effect better.
float spec = pow(max(dot(viewDirection, reflectionDirection), 0.0), 32);
vec3 specular = specularStrength * spec * LightColor;

vec3 lightResult = ambient + diffuse + specular;
```

<Heading title="Gouraud shading" />

Apparently people used to calculate all of this information inside of the vertex shader instead of the fragment shader since it was faster (but looked worse). This is because the vertex shader is done per vertex whereas the fragment shader is done per pixel. It is called [Gourand shading](https://en.wikipedia.org/wiki/Gouraud_shading) when it is done in the vertex shader.

I ended up implementing this because it gives that PSX effect (it is what they used after all).

```glsl
// Vertex shader
#version 330 core

layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aTexCoord;

out vec3 Normal;
out vec2 TexCoord;
out vec3 FragPosition;
out vec4 LightingOutput;

uniform mat4 ModelMatrix;
uniform mat4 CameraMatrix;

uniform vec3 CameraPosition;
uniform vec3 LightPosition;
uniform vec3 LightColor;
uniform bool HasTextures;
uniform sampler2D TextureDiffuse;

void main() {
    gl_Position = CameraMatrix * ModelMatrix * vec4(aPos.x, aPos.y, aPos.z, 1.0);
    FragPosition = vec3(ModelMatrix * vec4(aPos, 1.0));
    Normal = mat3(transpose(inverse(ModelMatrix))) * aNormal;
    TexCoord = aTexCoord;

    vec4 outputColor = vec4(1.0);
    if(HasTextures)
        outputColor = texture(TextureDiffuse, TexCoord);

    // ambient
    float ambientStrength = 0.1;
    vec3 ambient = ambientStrength * LightColor;

    // diffuse
    vec3 normal = normalize(Normal);
    vec3 lightDirection = normalize(LightPosition - FragPosition);
    float diff = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = diff * LightColor;

    // specular
    float specularStrength = 0.5;
    vec3 viewDirection = normalize(CameraPosition - FragPosition);
    vec3 reflectionDirection = reflect(-lightDirection, normal);
    float spec = pow(max(dot(viewDirection, reflectionDirection), 0.0), 32);
    vec3 specular = specularStrength * spec * LightColor;

    vec3 lightResult = ambient + diffuse + specular;
    outputColor *= vec4(lightResult, 1.0);
    LightingOutput = outputColor;
}

```

```glsl
// Fragment shader
#version 330 core

in vec3 Normal;
in vec2 TexCoord;
in vec3 FragPosition;
in vec4 LightingOutput;

out vec4 FragColor;

void main() {
    FragColor = LightingOutput;
}

```

<Img src="gouraud_example.jpg" caption="Gouraud shading in Based Engine" />

<Spotify src="track/0ISjLKLt7b9iiY0qEVR2ho?si=6ad5607cfda2491e" />

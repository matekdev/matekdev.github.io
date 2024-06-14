---
title: 'Based Logs #13 - Blinn-Phong in OpenGL'
description: 'Upgrading the lighting from Phong to Blinn-Phong'
date: '2024-05-29'
---

One issue that occurs with Phong lighting is that the specular light component could have an angle that is larger than 90 degrees. Which means the dot product becomes negative and the result gets clamped to zero (therefore nullifying the result).

```glsl
max(dot(viewDirection, reflectionDirection), 0.0)
```

<Img src="phong-fail.jpg" caption="LearnOpenGL" href="https://learnopengl.com/Advanced-Lighting/Advanced-Lighting" />

Notice that the image on the right showcases a situation where that angle could possibly exceed 90 degrees. To fix this we can use Blinn-Phong lighting which introduces the concept of a halfway vector. It's called the halfway vector because it is exactly halfway between the view direction and the light direction.

<Img src="halfway.jpg" caption="LearnOpenGL" href="https://learnopengl.com/Advanced-Lighting/Advanced-Lighting" />

The halfway vector will never go past 90 degrees in any realistic situation. To calculate it we add the light direction and the view direction and then normalize the result.

```glsl
// specular
vec3 lightDirection = normalize(light.Position - FragPosition);
vec3 viewDirection = normalize(CameraPosition - FragPosition);
vec3 halfWayDirection = normalize(lightDirection + viewDirection);
float spec = pow(max(dot(normal, halfWayDirection), 0.0), MaterialData.Shininess);
vec3 specular = light.Specular * (spec * MaterialData.Specular);
```

<Img src="result.jpg" />

This blog was pretty quick but the next one will be a big one since I'll be covering directional shadow mapping.

<Spotify src="track/4X6q8SE00pQH8r5HawfUQq?si=9225f2bef40b402a" />

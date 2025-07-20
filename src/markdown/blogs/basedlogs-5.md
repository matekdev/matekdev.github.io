---
title: 'Based Logs #5 - Lighting Types in OpenGL'
description: 'Adding support for different types of lights in the Based Engine'
date: '2024-05-19'
---

In the last blog I setup the lighting system in a way where we could support different types of lights. Our current implementation of a light is a basic point light. I'll be adding support for directional lights, "advanced" point lights, and spot lights.

<Heading title="Directional Lights" />

A directional light can be basically described as the sun. It gives an equal amount of light to each object from the same direction. It also doesn't really matter how far away an object is from the sun, it has the same amount of light applied.

```glsl
// We will be creating a new struct and new array for each one of
// the new lighting types we add.
struct DirectionalLight {
    vec3 Direction; // Note we want direction instead of position
    vec3 Ambient;
    vec3 Diffuse;
    vec3 Specular;
};

uniform DirectionalLight DirectionalLights[MAX_LIGHTS];
uniform int DirectionalLightCount;
```

```glsl
// In all cases we loop through all the lights and sum the value
// of the lighting result.
for(int i = 0; i < DirectionalLightCount; ++i) {
    lighting += CalculateDirectionalLight(DirectionalLights[i]);
}
```

These parts will all remain the same between each lighting implementation. The important part is the theory and the actual implementation of the function that calculates the light.

This function actually looks really similar to our original basic point light implementation. The only difference is how we calculate the `lightDirection` which is completely determined by direction that the light is facing.

```glsl
vec4 CalculateDirectionalLight(DirectionalLight light) {
    // ambient
    vec3 ambient = light.Ambient * MaterialData.Ambient;

    // diffuse
    vec3 normal = normalize(Normal);
    vec3 lightDirection = normalize(-light.Direction);
    float diff = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = light.Diffuse * (diff * MaterialData.Diffuse);

    // specular
    vec3 viewDirection = normalize(CameraPosition - FragPosition);
    vec3 reflectionDirection = reflect(-lightDirection, normal);
    float spec = pow(max(dot(viewDirection, reflectionDirection), 0.0), MaterialData.Shininess);
    vec3 specular = light.Specular * (spec * MaterialData.Specular);

    vec3 result = ambient + diffuse + specular;
    return vec4(result, 1.0);
}
```

We can get the direction of the light by extracting the direction from the transform. This is all we care about since for the sun the distance away from the object doesn't really matter, it's the direction.

```cpp
glm::vec3 TransformComponent::GetDirection()
{
    return glm::normalize(glm::vec3(GetTransform()[2])); // z direction
}
```

<Img src="directional-lights.jpg" />

The lighting still looks pretty off because we aren't actually casting any shadows. The important part is to consider that we have a light source that is giving off light to each object to our scene like the sun.

<Heading title="Point Lights" />

As mentioned the initial implementation of our light was a basic point light. One way we can make the point light feel more natural is by adding `attenuation`. The main idea is that lights don't diminish linearly over a distance. We factor this into our calculation and the lights will appear to be more realistic. I don't care to explain the formula details but I'll give a snippet to my implementation.

```cpp
vec4 CalculatePointLight(PointLight light) {
    // ambient
    vec3 ambient = light.Ambient * MaterialData.Ambient;

    // diffuse
    vec3 normal = normalize(Normal);
    vec3 lightDirection = normalize(light.Position - FragPosition);
    float diff = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = light.Diffuse * (diff * MaterialData.Diffuse);

    // specular
    vec3 viewDirection = normalize(CameraPosition - FragPosition);
    vec3 reflectionDirection = reflect(-lightDirection, normal);
    float spec = pow(max(dot(viewDirection, reflectionDirection), 0.0), MaterialData.Shininess);
    vec3 specular = light.Specular * (spec * MaterialData.Specular);

    // attenuation
    float distance = length(light.Position - FragPosition);
    float attenuation = 1.0 / (light.Constant + light.Linear * distance + light.Quadratic * (distance * distance));

    ambient *= attenuation;
    diffuse *= attenuation;
    specular *= attenuation;

    vec3 result = ambient + diffuse + specular;
    return vec4(result, 1.0);
}
```

<Img src="point-lights.jpg" />

<Heading title="Spot Lights" />

The last type of light we will be adding is a spot light. We can think of these as basically a flash light. I'm going to steal another diagram from [LearnOpenGL](https://learnopengl.com/Lighting/Light-casters) to explain them.

<Img src="spot-light-diagram.jpg" />

- `SpotDir` we can think of the direction method we added in directional lighting
- `LightDir` is a vector pointing from the fragment to the position of the light source
- `ϕ` the cut off angle where anything outside of this angle is not lit
- `θ` is the angle between the `SpotDir` and `LightDir`, it needs to be smaller than `ϕ` to be inside the light

We calculate the dot product between `SpotDir` and `LightDir` and compare this with the cut off `ϕ`. The dot product result gives us a cosine value. So when we pass the cut off value into our shader we also want it to be a cosine value.

```cpp
// I called it "Radius" instead of "cutoff" but I feel like the term radius doesn't make sense here?
_modelShader.SetFloat(Shader::Format(Shader::SPOT_LIGHTS, Shader::RADIUS, index), glm::cos(glm::radians(light.Radius)));
```

```glsl
vec3 lightDirection = normalize(light.Position - FragPosition);
float theta = dot(lightDirection, normalize(-light.Direction));
if(theta > light.Radius)
{
    // do lighting calculations
}
else
{
    // we are not inside of the light
}
```

There is a concept of smooth/soft edges we need to consider. Anything outside of the light doesn't just instantly go black but instead should have a fall off. The formula is described on the [LearnOpenGL](https://learnopengl.com/Lighting/Light-casters) page if you want to read up about it.

```glsl
vec4 CalcualteSpotLight(SpotLight light) {
    vec3 lightDirection = normalize(light.Position - FragPosition);

    // ambient
    vec3 ambient = light.Ambient * MaterialData.Ambient;

    // diffuse
    vec3 normal = normalize(Normal);
    float diff = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = light.Diffuse * (diff * MaterialData.Diffuse);

    // specular
    vec3 viewDirection = normalize(CameraPosition - FragPosition);
    vec3 reflectionDirection = reflect(-lightDirection, normal);
    float spec = pow(max(dot(viewDirection, reflectionDirection), 0.0), MaterialData.Shininess);
    vec3 specular = light.Specular * (spec * MaterialData.Specular);

    // soft edges
    float theta = dot(lightDirection, normalize(-light.Direction));
    float epsilon = (light.Radius - light.OuterRadius);
    float intensity = clamp((theta - light.OuterRadius) / epsilon, 0.0, 1.0);

    ambient *= intensity;
    diffuse *= intensity;
    specular *= intensity;

    // attenuation
    float distance = length(light.Position - FragPosition);
    float attenuation = 1.0 / (light.Constant + light.Linear * distance + light.Quadratic * (distance * distance));

    ambient *= attenuation;
    diffuse *= attenuation;
    specular *= attenuation;

    vec3 result = ambient + diffuse + specular;
    return vec4(result, 1.0);
}
```

<Img src="spot-lights.jpg" caption="Notice the circular pattern the light gives off" />

Here is the [complete fragment shader file](https://github.com/matekdev/lean-engine/blob/64465af0f89fbe377aa07d2d0fbd612b40a659de/shaders/model.frag) if anyone is interested in checking it out.

<YoutubeMusic src="Z37DsiaAyAc" />

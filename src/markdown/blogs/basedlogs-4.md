---
title: 'Based Logs #4 - Multiple lights in OpenGL'
description: 'Adding multiple light support in the Based Engine'
date: '2024-05-18'
---

The plan is to add support for different light types such as directional lights, point lights, and spot lights. Right now my entire shader file is hard coded to only support one basic point light.

```glsl
void main() {
    vec4 outputColor = vec4(1.0);
    if(HasTextures)
        outputColor = texture(TextureDiffuse, TexCoord);

    // ambient
    vec3 ambient = LightData.Ambient * MaterialData.Ambient;

    // diffuse
    vec3 normal = normalize(Normal);
    vec3 lightDirection = normalize(LightData.Position - FragPosition);
    float diff = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = LightData.Diffuse * (diff * MaterialData.Diffuse);

    // specular
    vec3 viewDirection = normalize(CameraPosition - FragPosition);
    vec3 reflectionDirection = reflect(-lightDirection, normal);
    float spec = pow(max(dot(viewDirection, reflectionDirection), 0.0), MaterialData.Shininess);
    vec3 specular = LightData.Specular * (spec * MaterialData.Specular);

    vec3 lightResult = ambient + diffuse + specular;
    outputColor *= vec4(lightResult, 1.0);
    FragColor = outputColor;
}
```

Instead of adding on top of this I'm going to support multiple lights since that'll allow me to extract the light logic out to a function.

```glsl
vec4 CalculateLight(Light light) {
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

    vec3 result = ambient + diffuse + specular;
    return vec4(result, 1.0);
}

void main() {
    vec4 outputColor = vec4(1.0);
    if(HasTextures) {
        outputColor = texture(TextureDiffuse, TexCoord);
    }

    for(int i = 0; i < LightCount; ++i) {
        outputColor *= CalculateLight(Lights[i]);
    }

    FragColor = outputColor;
}
```

Since all the light logic is in its own function I'll be able to easily add new functions to do the lighting calculations for the different light types. However, let's get back to adding multiple lights. I'm going to define an array of lights that will have a max length of 4 (In the future we can look at supporting a dynamic amount).

```glsl
#define MAX_LIGHTS 4

struct Light {
    vec3 Position;
    vec3 Ambient;
    vec3 Diffuse;
    vec3 Specular;
};

uniform Light Lights[MAX_LIGHTS];
uniform int LightCount;
```

All we need to do now is pass the appropriate data to the shader.

```cpp
auto lightGroup = Scene::ActiveScene->Registry.view<LightComponent, TransformComponent>();
for (auto it = lightGroup.begin(); it != lightGroup.end(); ++it)
{
    int index = std::distance(lightGroup.begin(), it);
    auto &light = lightGroup.get<LightComponent>(*it);
    auto &transform = lightGroup.get<TransformComponent>(*it);

    _modelShader.Bind();
    _modelShader.SetInt(Shader::LIGHT_COUNT, lightGroup.size_hint());
    _modelShader.SetVec3(Shader::Format(Shader::LIGHTS, Shader::POSITION, index), transform.Position);
    _modelShader.SetVec3(Shader::Format(Shader::LIGHTS, Shader::AMBIENT, index), light.Ambient);
    _modelShader.SetVec3(Shader::Format(Shader::LIGHTS, Shader::DIFFUSE, index), light.Diffuse);
    _modelShader.SetVec3(Shader::Format(Shader::LIGHTS, Shader::SPECULAR, index), light.Specular);
    _modelShader.SetVec3(Shader::CAMERA_POSITION, Scene::ActiveScene->GetCamera().GetPosition());
}
```

I wrote a nice little utility function to allow me to format the shader string that I need to pass in. Since we are updating a uniform array the shader string needs to be in the form of `Light[0].Position`.

```cpp
static inline const std::string POSITION = "Position";
static inline const std::string AMBIENT = "Ambient";
static inline const std::string DIFFUSE = "Diffuse";
static inline const std::string SPECULAR = "Specular";
static inline const std::string SHININESS = "Shininess";

static inline std::string Format(const std::string &name, const std::string &member, const int &index)
{
    return name + "[" + std::to_string(index) + "]." + member;
}
```

<Img src="two-lights.jpg" caption="Two different lights!!" />

Here are the next few things that we are going to look into now that we have multiple light support.

1. Implement the various different types of lights (directional, point, and spotlight), right now we have a basic implementation of a point light.
2. Add shadow mapping... and I'm a little bit concerned about how difficult this will be, especially since we will need to calculate shadows for multiple lights and for each different light type.

<YoutubeMusic src="x0oc-76u3ps" />

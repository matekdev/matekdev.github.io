---
title: 'Based Logs #16 - Initial DirectX 11 Impressions'
description: 'My initial impressions of DirectX 11'
date: '2024-06-15'
---

I've been slowly trying to get caught up with my OpenGL iteration of the Based Engine. I wanted to go over some of the differences I encountered so far as I've converted from OpenGL to DirectX 11.

<Heading title="Setup" />

Since I'm on windows I'm able to reference all of the DirectX 11 libraries automatically. I just need to simply import the libraries I need within my `.cpp` files. Setting up projects in C++ sucks... and anything to decrease the time it takes to get up and running is a massive positive.

<Heading title="Structure" />

I have only positive things to say about how DirectX 11 is initialized. Almost everything makes use of Microsoft's custom smart shared pointer `Microsoft::WRL::ComPtr`. You wrap almost everything within these objects and then pass them into initialization functions. Since they mimic a smart pointer everything will automatically get cleaned up for you when it goes out of scope.

```cpp
if (FAILED(CreateDXGIFactory1(IID_PPV_ARGS(&_dxgiFactory))))
    LOG(ERROR) << "Failed to create DXGIFactory";

D3D_FEATURE_LEVEL deviceFeatureLevel = D3D_FEATURE_LEVEL::D3D_FEATURE_LEVEL_11_0;
if (FAILED(D3D11CreateDevice(
        nullptr,
        D3D_DRIVER_TYPE::D3D_DRIVER_TYPE_HARDWARE,
        nullptr,
        0,
        &deviceFeatureLevel,
        1,
        D3D11_SDK_VERSION,
        _device.GetAddressOf(),
        nullptr,
        _deviceContext.GetAddressOf())))
    LOG(ERROR) << "Failed to create DXGIDevice";
```

The amount of lines it took to get a triangle rendering on the screen wasn't a crazy amount. I'd say it was about 2x the amount in OpenGL. This is because GLFW and OpenGL automatically take care of some initial initialization for you. For example, I've mentioned this in a previous blog, GLFW automatically creates a framebuffer by default for you.

Whereas DirectX 11 requires the explicit initialization of aspects such as the swap chain. The swap chain being a series of two or more buffers that are used to render frames to the screen (alternating between buffers to enable flicker-free rendering).

There are other parts that are just simply more verbose. Such as the DirectX 11 uniform equivalent which is constant buffers.

<Heading title="Constant Buffers" />

Constant buffers are the equivalent to OpenGL's uniforms. It's data that remains the same across all shading stages. Here are some segments of commented code that show how they are used.

```cpp
// Initialization
D3D11_BUFFER_DESC bufferDesc = {};
bufferDesc.ByteWidth = sizeof(T);
bufferDesc.StructureByteStride = 0;
bufferDesc.Usage = D3D11_USAGE_DYNAMIC;
bufferDesc.BindFlags = D3D11_BIND_CONSTANT_BUFFER;
bufferDesc.CPUAccessFlags = D3D11_CPU_ACCESS_WRITE;
bufferDesc.MiscFlags = 0;

D3D11_SUBRESOURCE_DATA subresourceData = {};
subresourceData.pSysMem = &constant;

if (FAILED(Renderer::GetDevice()->CreateBuffer(&bufferDesc, &subresourceData, &_constantBuffer)))
    LOG(ERROR) << "Failed to create constant buffer";

// Providing data to the constant buffer
// Note that the data has to be 16 byte aligned!
D3D11_MAPPED_SUBRESOURCE mappedSubresource = {};
if (FAILED(Renderer::GetDeviceContext()->Map(_constantBuffer.Get(), 0, D3D11_MAP_WRITE_DISCARD, 0, &mappedSubresource)))
    LOG(ERROR) << "Failed to update constant buffer";

memcpy(mappedSubresource.pData, &constant, sizeof(T));
Renderer::GetDeviceContext()->Unmap(_constantBuffer.Get(), 0);

// We have to select the shader stages we want to bind them to
// We also have to mark which slot the constant buffer maps to within the shader
if (_shaderStage == ShaderStage::VERTEX_SHADER)
    Renderer::GetDeviceContext()->VSSetConstantBuffers(_slot, 1, _constantBuffer.GetAddressOf());
else if (_shaderStage == ShaderStage::PIXEL_SHADER)
    Renderer::GetDeviceContext()->PSSetConstantBuffers(_slot, 1, _constantBuffer.GetAddressOf());
```

```hlsl
// Vertex data passed into the shader
struct VSInput
{
    float3 position : POSITION;
};

// Output data that moves onto the next stage
struct VSOutput
{
    float4 position : SV_Position;
    float3 color : COLOR0;
};

// The constant buffers I've defined, in this case CameraMatrix maps to
// slot 0. Consider also that the data inside is 16 byte aligned!
cbuffer CameraMatrix : register(b0)
{
    matrix CameraViewMatrix;
    matrix CameraProjectionMatrix;
};

cbuffer ModelMatrix : register(b1)
{
    matrix ModelMatrix;
}

VSOutput Main(VSInput input)
{
    matrix cameraMatrix = mul(CameraProjectionMatrix, CameraViewMatrix);
    VSOutput output;
    output.position = mul(cameraMatrix, mul(ModelMatrix, float4(input.position, 1.0f)));
    output.color = float4(0.7f, 0.5f, 1.0f, 1.0f);
    return output;
}
```

<Heading title="Resources" />

I found the number of DirectX 11 resources a bit more scattered. I seriously think that [LearnOpenGL](https://learnopengl.com/) is probably one of the best resources I've read and nothing really compares to it. It's definitely a great place to start as an introduction into computer graphics. I found myself jumping between a lot of resources and not having too many issues since I have a good understanding of the concepts I want to implement.

<Heading title="Current Progress" />

<Img src="dx11.jpg" />

Here is the current progress I've made so far in DirectX 11.

- Model importing (textures not handled yet!)
- Camera implemenation
- General UI (rendering to ImGui panel, etc.)

It was actually incredibly easy getting model importing to work. At the end of the day all you are doing is passing in vertex data which every single graphics API will support. The camera implemenation was also extremely simple after I setup my wrapper for the constant buffers. I had a bit more difficulty rendering to an ImGui scene because I had to setup two render target views. One that would take up the width/height of the entire application (for all ImGui panels to render) and another for the specific scene view.

I'm making great progress and I feel extremely confident working with this API so far. There is going to be a major break in these blogs however... I'm going to Poland for 2+ weeks so I won't be around for a bit. I hope that I'll be able to make a new blog soon with a lot of the previous features implemented. Then start working towards more exciting graphical features.

<YoutubeMusic src="22tVWwmTie8" />

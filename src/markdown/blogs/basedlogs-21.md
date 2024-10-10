---
title: 'Based Logs #21 - Cubemaps Round #2'
description: 'Adding static environmental mapping in DirectX11'
date: '2024-10-09'
---

I previously had cube map support in the older OpenGL version and wanted to implement it in DirectX 11. I wasted a bunch of my initial time creating a cube model that already mapped the cube map texture onto it. I thought I was going to be slick and just be able to reuse my current model and texture loading code. The issue with this approach is cube maps need to be loaded in differently than regular textures.

So anyways... here is some rough code on how you would go about loading all six cube map textures.

```cpp
    const int size = 6;
    int width, height, nrComponents;
    std::vector<stbi_uc *> textureData(size);
    for (int i = 0; i < size; ++i)
    {
        textureData[i] = stbi_load(_imagePaths[i].c_str(), &width, &height, &nrComponents, 4);
    }

    D3D11_TEXTURE2D_DESC textureDesc = {};
    textureDesc.Width = width;
    textureDesc.Height = height;
    textureDesc.MipLevels = 1;
    textureDesc.ArraySize = size;
    textureDesc.Format = DXGI_FORMAT_R8G8B8A8_UNORM;
    textureDesc.SampleDesc.Count = 1;
    textureDesc.SampleDesc.Quality = 0;
    textureDesc.Usage = D3D11_USAGE_DEFAULT;
    textureDesc.BindFlags = D3D11_BIND_SHADER_RESOURCE;
    textureDesc.CPUAccessFlags = 0;
    textureDesc.MiscFlags = D3D11_RESOURCE_MISC_TEXTURECUBE;

    D3D11_SUBRESOURCE_DATA data[size];
    for (int i = 0; i < size; i++)
    {
        data[i].pSysMem = textureData[i];
        data[i].SysMemPitch = width * sizeof(UINT);
        data[i].SysMemSlicePitch = 0;
    }

    Microsoft::WRL::ComPtr<ID3D11Texture2D> texture;
    Renderer::GetDevice()->CreateTexture2D(&textureDesc, data, &texture);

    D3D11_SHADER_RESOURCE_VIEW_DESC srvDesc = {};
    srvDesc.Format = textureDesc.Format;
    srvDesc.ViewDimension = D3D11_SRV_DIMENSION_TEXTURECUBE;
    srvDesc.TextureCube.MostDetailedMip = 0;
    srvDesc.TextureCube.MipLevels = 1;

    Renderer::GetDevice()
        ->CreateShaderResourceView(texture.Get(), &srvDesc, &_shaderResourceView);

    for (int i = 0; i < size; ++i)
    {
        stbi_image_free(textureData[i]);
    }
```

Then all we need to do is just bind them and use them in the shader.

```cpp
Renderer::GetDeviceContext()->PSSetShaderResources((unsigned int)TextureType::SKYBOX, 1, _shaderResourceView.GetAddressOf());
```

The interesting part here is we define it as a `TextureCube` instead of a `Texture2D`.

```hlsl
struct PSInput
{
    float4 Position : SV_Position;
    float3 TexCoords : TEXCOORD;
};

struct PSOutput
{
    float4 Color : SV_Target0;
};

TextureCube CubeMapTexture : register(t1);
SamplerState TextureSampler : register(s0);

PSOutput Main(PSInput input)
{
    PSOutput output;
    output.Color = float4(CubeMapTexture.Sample(TextureSampler, input.TexCoords).rgb, 1.0f);
    return output;
}
```

There isn't much else to add... I basically ported over the GLSL implementation. It all basically behaves the same as it did back in my OpenGL engine.

<Img src="cubemap.jpg" />

I still don't understand the difference between skybox, cube map, and environment mapping. I guess skybox is the concept of having some far distant texture? Environment mapping is sampling that texture onto the model. And lastly... cube maps are just the six textures that are used? Whatever...

<Spotify src="track/0xwpK0H2aL5YxREvcNw4Pe?si=5a734e1ee6e0494f" />

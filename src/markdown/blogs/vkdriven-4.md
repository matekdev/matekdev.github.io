---
title: 'VKDriven #4 - PBR'
description: 'Physically based rendering'
date: '2026-10-06'
hidden: false
---

Wow I actually finally managed to implement PBR this time without getting side tracked. I sat down with a pen and paper and wrote out notes from the incredible [LearnOpenGL article](https://learnopengl.com/PBR/Theory) which talks about the theory of PBR.

Physically based rendering is a collection of rendering techniques that mimic the real world. It allows artists to define material properties that work across various lighting conditions. It's called physically based rendering because it's based on how the physical world works (wow!). PBR must satisfy three conditions...

1. Be based on the microfacet model
2. Be energy conserving
3. Use a physically based "BRDF" (bidirectional reflectance distribution function)

# Microfacet Model

A surface can be described by tiny little reflective mirrors called microfacets. If the surface is rough, there will be lots of bumps, if the surface is smooth, it'll be fairly level. The rougher the surface, the more likely that light rays will scatter when it bounces off the service.

No surface is completely smooth, but we approximate the microfacet roughness given a **roughness** parameter. If roughness is towards 0, you get a mirror like appearance (a stronger specular reflection), as it approaches 1 it'll be matte like.

# Energy Conservation

Outgoing light should never exceed the incoming light energy. This is the basis of energy conversation.

When a light hits a surface it gets split in both a **reflection** and **refraction** part. The reflection part is the light that gets reflected and doesn't enter the surface, this is the specular lighting. Whereas the refraction part is the light that gets absorbed by the surface, or diffuse lighting.

**Subsurface scattering** is the idea that when the surface DOES get absorbed (i.e refraction), it properly calculates how the light rays bounce around inside the material. This is obviously more complicated and less performant.

PBR makes a distinction between **metallic** and **non-metallic** surfaces.
- Non-metallic: the light scatters around inside, gets partly absorbed (that's what gives it color), and comes back out. That's diffuse.
- Metallic: the light is absorbed almost immediately and never comes back out. So there's no diffuse.

# The Reflection Equation

A bunch of smart people came up with an equation called "the render equation", it calculates the exact amount of light leaving a point on the surface. PBR uses "the reflectance equation" which is a simplified version.

# BRDF

The "bidirectional reflectance distribution function" (BRDF) is the `fr` part of the reflectance equation. Given the direction light is coming from and the direction we're looking from, it answers: **what fraction of that light bounces toward the camera?**.

It's built from two parts, which link back to the reflection/refraction split: a diffuse part (refracted light) and a specular part (reflected light). In my case, I used Lambert for the diffuse and Cook-Torrance for the specular, which is the combination LearnOpenGL uses.
Here's the full equation, I'll break it down.

```
fr = kd · f_lambert + f_cook-torrance
```

## Diffuse (Lambert)

```
f_lambert = c / π
```

- `c` is the albedo, the surface's base color.
- `π` is there for energy conservation, without it, adding up the light going out in every direction would give you more than came in. The light radiates in a hemisphere, so we want one direction instead of everything.

## Specular (Cook-Torrance)

```
                     D · F · G
f_cook-torrance = ─────────────────
                  4 · (n·v) · (n·l)
```

This is where the microfacets come in. First we need the halfway vector.

```
h = normalize(l + v)
```

Three functions describe what the microfacets are doing.

### D: Normal Distribution Function (Trowbridge-Reitz GGX)

```
                 α²
D = ─────────────────────────────      where α = roughness²
     π · ((n·h)² · (α² − 1) + 1)²
```

How many microfacets are facing `h`?

### G: Geometry Function (Smith + Schlick-GGX)

```
                n·x
G_sub(n, x) = ──────────────────     where k = (roughness + 1)² / 8
              (n·x) · (1 − k) + k

G = G_sub(n, v) · G_sub(n, l)
```

How many microfacets are blocked by their neighbours?

### F: Fresnel (Schlick approximation)

```
F = F0 + (1 − F0) · (1 − (h·v))⁵
```

How strongly does the surface reflect at this angle?

`F0` is the reflectivity when looking straight at the surface:

- Non-metals: around `0.04`, a weak, colorless reflection.
- Metals: their albedo color. That's why reflections off gold are gold.

### The Denominator

`4 · (n·v) · (n·l)` converts from the microfacet's point of view back to the surface's.

## Sharing the light (kS and kD)

Light either reflects or refracts, never both. Fresnel already tells us how much reflects, so:

```
kS = F
kD = (1 − kS) · (1 − metallic)
```

# Putting It All Together

Plugging everything back into the reflectance equation:

```
Lo = Σ  ( kD · albedo / π  +  D·F·G / (4 · (n·v) · (n·l)) ) · radiance · (n·l)
```

# Conclusion

<Img src="result.webp" caption="Wow it still looks like crap"  />

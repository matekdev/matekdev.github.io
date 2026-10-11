---
title: 'VKDriven #6 - CSM'
description: 'Cascaded shadow maps'
date: '2026-10-10'
hidden: false
---

There's a bunch of limitations with the previous implementation of shadows. Firstly, we render the entire scene around an origin point. What if our camera starts moving to a different section of the world? Well, we would either have to render the entire world, or attempt to move our render point so it included the new area that the camera is looking at. Secondly, our shadows are all rendered at the same level. Even though we know that things up close should be rendered with more precision than things far away.

How do we fix that? Well we use cascaded shadow maps.

# Cascaded shadow maps

The general idea with cascaded shadow maps is we first grab the frustum of our camera. The frustum of our camera is the visible space to the camera. Using this frustum we can solve the two previous issues mentioned above.

1. Focus the shadow maps on what the camera can see, stretched a little toward the light so off-screen objects can still cast shadows into view.
2. Split the view frustum into sections. Every section gets a shadow map of the same size, but the near sections cover a much smaller area, so their texels are smaller and their shadows sharper.

So what did I actually do? I split the view frustum into four sections and fit an orthographic box from the light around each one. Then I render the scene's depth from the light four times, once per box. The near boxes are small, so their shadows are sharp. The far boxes cover much more ground, so their shadows are blurrier, but they're far away and take up fewer pixels on screen, so you don't notice.


<Img src="cascades.webp" caption="Cascades visualized" />

<Img src="csm.webp" caption="Cascaded shadow maps in Sponza" />

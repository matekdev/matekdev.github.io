---
title: 'VKDriven #6 - Shadow mapping'
description: 'For the second time'
date: '2026-10-08'
hidden: false
---

I wrote about [shadow mapping back in the OpenGL days](https://matek.dev/blog/basedlogs-14/) so I'm going to keep this fairly brief.

The general idea for shadow mapping is we need to add a new render pass. This render pass will only care about depth and will be rendered via the perspective of our light source. In our case, we just do directional lighting for now, so think about rendering from the perspective of the lights position and direction.

Once we have that, we can use that data to figure out what should be shaded. All we need is a tiny bit of math which you can read about in my previous blog.

# Shadow acne

You'll most likely end up with shadow acne. This is because our shadow map resolution is low, you'll basically end up with a surface incorrectly reporting they are in a shadow. You can fix this by introducing a depth bias which will "push" the depth values inwards.

# PCFs

The shadows look extremely hard and jagged so we want to smooth them out. We go ahead and look at surrounding shadow values and average them out, this creates a smooth gradient rather than a hard yes/no of whether or not a point is in the shadow.

<Img src="shadows.webp" caption="Shadows in Sponza" />

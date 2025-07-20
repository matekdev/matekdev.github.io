---
title: 'Based Logs #19 - PhysX and Object Picking'
description: 'Physics engine integration'
date: '2024-10-06'
---

Over the weekend I decided to integrate a physics engine into Based Engine. I didn't want to go overboard and integrate some crazy complicated physics engine. I saw a thread where everyone was saying [PhysX](https://github.com/NVIDIA-Omniverse/PhysX) was extremely easy to use... and I love NVIDIA...

## Building PhysX

The annoying part of PhysX is they don't distribute the built files anywhere. You have to unfortunately clone the repo and build it yourself. I found the documentation confusing but I eventually figured it out by browsing through enough issues on the PhysX page. I decided to record a video to help out anyone in the future that needs to build it.

<Youtube id="kfay4cjYEKQ" />

## Integrating PhysX

I am shocked at how easy it is to integrate PhysX. I assumed that it'd be some complicated process but I was up and running in about 100 lines of code. NVIDIA also provides a bunch of helpful examples... [the only one I ever referenced was this one](https://github.com/NVIDIA-Omniverse/PhysX/tree/main/physx/snippets/snippethelloworld).

PhysX also has the [PhysX Visual Debugger](https://developer.nvidia.com/physx-visual-debugger) which is an amazing tool. It allows you to visualize the physics simulations and step through them as well. The setup for the debugger is also only a few lines as well.

<Img src="debugger.jpg" />

The most interesting part is getting the actual physics objects to follow the objects you render via your graphics API (in my case DX11). Well, each object has a `getGlobalPose()` which returns a transform. All you need to do is pass this transform data to whatever abstraction you have setup that manages object position, rotation, etc.

## Object Picking

[Back in the OpenGL days I used this "hack" for object picking](https://matek.dev/blog/basedlogs-1/). However, we don't need anything like that anymore. We are now able to define bounds for each object within our scene and ray cast for the object we are attempting to pick.

In my transform component I got rid of my own definitions of `position`, `rotation`, etc. Instead, I now just make sure of the transform that is available on every rigid body within PhysX.

```cpp
_pxRigidBody = Scene::ActiveScene->GetPhysics()->createRigidStatic(physx::PxTransform(physx::PxIdentity));
auto transform = _pxRigidBody->getGlobalPose();
```

Now, all that needs to be done is I need to create the collider for each object within my scene. I don't know if this is the most optimal solution... but I came up with this and it works.

Whenever the user loads in a new model I grab the minimum and maximum point of the model. This allows me to create a BBox around the model defining a collider that covers the entire model. All we do then is attach the BBox to the rigid body within PhysX.

```cpp
void TransformComponent::SetBBox(const glm::vec3 &min, const glm::vec3 &max)
{
    if (_pxShape)
    {
        _pxRigidBody->detachShape(*_pxShape);
        PX_RELEASE(_pxShape);
    }

    auto minPoint = physx::PxVec3(min.x, min.y, min.z);
    auto maxPoint = physx::PxVec3(max.x, max.y, max.z);

    _extents = (maxPoint - minPoint) * 0.5f;
    _pxShape = Scene::ActiveScene->GetPhysics()->createShape(calculateBBox(), *_pxMaterial);
    _pxRigidBody->attachShape(*_pxShape);
}
```

<Img src="ex1.jpg" />

<Img src="ex2.jpg" />

Since I use the transform provided by the rigid body, my engine already renders the physics objects perfectly. The last thing we need to consider is scaling the model.

If the model scale increases or decreases we need to adjust the BBox accordingly.

```cpp
physx::PxBoxGeometry TransformComponent::calculateBBox()
{
    return physx::PxBoxGeometry(
        std::max(std::abs(_extents.x * _scale.x), 0.01f),
        std::max(std::abs(_extents.y * _scale.y), 0.01f),
        std::max(std::abs(_extents.z * _scale.z), 0.01f));
}
```

In my case I provided a minimum value of `0.01f` otherwise PhysX freaks out if you try to create a BBox with a value of `0.0f`. That is it! Now we have a proper collider for each object within our scene that we can hit via a ray cast.

The difficult part about the ray cast is we need to convert our 2D mouse cursor position to world space. [I found this great resource](https://www.opengl-tutorial.org/miscellaneous/clicking-on-objects/picking-with-a-physics-library/) that explains the process perfectly. We can then just cast a ray and see if we hit an object, if we do then we know we need to select it.

That's it! In the next blog I think I'm going to setup a few physics components and allow the user to play around with the physics objects within the scene.

<YoutubeMusic src="bRircB2hwSU" />

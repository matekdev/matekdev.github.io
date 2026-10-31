---
name: 'MROK'
skills: 'C#, Razor, s&box'
---

MROK is a multiplayer voxel arena FPS built on s&box, in the style of Quake and Doom: fast movement, rocket jumping, gibs, and gothic arenas you can blow apart. Alongside the PvP modes there's Crucible, a co-op roguelike where up to four players hold out against a demon horde.

The voxel engine, netcode and game systems are all custom, written in C# on top of s&box.

<Img src="ex1.webp" alt="A rocket explodes between two voxel fighters, blasting a crater in the floor" />

## Gameplay

- **Seven modes:** Deathmatch, Team Deathmatch, Capture the Flag, Instagib, Infection, Crusade and Crucible
- **Crucible:** demon hordes, bosses with weak points, blessings that build up your character during a run, and permanent upgrades bought with souls between runs
- **Quake movement:** strafe-jumping, bunny hopping, air control, and rocket jumps that respond instantly
- **Arsenal:** gauntlet, shotgun, machine guns, grenade and rocket launchers, lightning gun, railgun, plasma gun and BFG
- **Destruction:** explosions dig through marked parts of a map, and anything left unsupported collapses into debris
- **Carvable demons:** enemy bodies are voxels too, so shots take chunks out of them and limbs come off
- **16 arenas:** cathedrals, a foundry, floating sky temples, an abbey inside a sea monster's skeleton and more
- **Map editor:** in-game editor with undo, co-op editing for up to eight people, .vox import and export, and Workshop publishing
- **Bots:** four difficulties, played through the same pawn and movement code as real players
- **Progression:** levels 1-99, crates and hundreds of unlockable cosmetics

<Img src="ex2.webp" alt="Firing the lightning gun into demons in Crucible" />
<Img src="ex3.webp" alt="A demon horde crossing a courtyard in Crucible" />
<Img src="ex4.webp" alt="The lightning gun hitting a heavy demon on a courtyard stairway" />

## Voxel engine

- **Greedy meshing on worker threads:** the mesher is a pure function of a padded chunk copy, so it never touches engine objects. Render faces merge only when type, colour, baked AO and sky cover all match, while collision faces merge on solidity alone
- **In-place collider updates:** edits update the existing physics shape instead of rebuilding it, so a chunk doesn't pay for a new collider on every explosion
- **Compact storage:** 32³ chunks of 16-bit voxels (4-bit block type, RGB444 colour), with worlds up to 320×320×128 blocks
- **Structural collapse:** the host searches for blocks cut off from the ground, with a node budget so one huge blast can't stall the host, then turns them into physics debris built on a worker thread

<Img src="ex5.webp" alt="Railgun fight above a molten floor" />
<Img src="ex6.webp" alt="Floating islands over a bottomless void" />

## Netcode

- **Host authority:** clients request changes and the host validates and applies them. Damage, health, ammo, block edits, pickups and score are all host-owned, and the host doesn't have to be a player
- **Predicted rockets:** your rocket appears the moment you fire. A local copy flies until the networked one arrives and takes over
- **Rocket jump prediction:** the blast pushes you locally with no round trip. The host then sends its own figure, and you're only corrected if the two differ by more than 30 units per second
- **Lag compensation:** the host keeps a hitbox history and rewinds up to half a second. A rocket's fast-forward is swept against those rewound hitboxes, capped at 150 ms
- **World replication:** edits go out as one sequenced delta per tick, and a gap in the sequence triggers a resync
- **Late joins:** a joining player gets the map seed plus only the chunks that changed, run-length encoded and compressed. Player-made maps transfer in 64 KB parts
- **Movement checks:** movement is owner-driven at 125 Hz, and the host sanity-checks speed, walls and flight

<Img src="ex7.webp" alt="A frozen lake with a galleon locked in the ice" />

<Img src="ex8.webp" alt="Two fighters in a railgun duel over a molten floor" />

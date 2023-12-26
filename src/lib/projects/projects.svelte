<script lang="ts">
	import Project from '$lib/projects/projectpreview.svelte';

	const projects: App.Project[] = [
		{
			name: 'Node RAPIDS',
			description: 'GPU-accelerated data-science libraries on Node.js',
			skills: 'C++, TypeScript, CUDA',
			href: '/projects/node-rapids'
		},
		{
			name: 'Grubs',
			description: 'Procedurally generated multiplayer worms-like game',
			skills: 'C#, Razor, s&box',
			href: '/projects/grubs'
		},
		{
			name: 'Parkour Painters',
			description: 'Retro multiplayer parkour game',
			skills: 'C#, Razor, s&box',
			href: '/projects/parkour-painters'
		},
		{
			name: `Matt's Minigolf`,
			description: 'Multiplayer minigolf game',
			skills: 'C#, Razor, s&box',
			href: '/projects/minigolf'
		},
		{
			name: 'OpenGL Model Viewer',
			description: 'Basic OpenGL model viewer written in C++',
			skills: 'C++, OpenGL, ImGui',
			href: '/projects/opengl-model-viewer'
		},
		{
			name: 'Small Fish Site',
			description: 'Small Fish, big dreams',
			skills: 'Svelte, Tailwind',
			href: 'https://smallfi.sh/'
		},
		{
			name: 'Retter',
			description: 'Reddit mobile app',
			skills: 'Flutter, Dart',
			href: 'https://github.com/matekdev/Retter'
		},
		{
			name: 'Turtle Links',
			description: 'Dynamic link service provider',
			skills: 'Svelte, Supabase, Tailwind',
			href: 'https://github.com/chandertech/turtlelinks'
		},
		{
			name: 'TTT',
			description: 'Multiplayer mafia-esque game',
			skills: 'C#, Razor, s&box',
			href: '/projects/ttt'
		},
		{
			name: 'Other Projects',
			description: 'Other projects available on my personal GitHub',
			skills: '',
			href: 'https://github.com/matekdev'
		}
	];
</script>

<div class="py-4 font-roboto">
	<p class="pb-2 text-3xl text-white">Projects & Contributions</p>
	<div class="grid grid-cols-1 md:grid-cols-2">
		{#each projects as project}
			<Project {project} />
		{/each}
	</div>
</div>

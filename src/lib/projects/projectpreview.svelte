<script lang="ts">
	import { resolveProjectThumbnailPath } from '$lib/Utils';

	let { project }: { project: App.Project } = $props();

	const skillList = $derived(
		project.skills ? project.skills.split(',').map((skill) => skill.trim()) : []
	);
</script>

<a
	href={project.href}
	class="group flex h-full gap-4 rounded-md border border-white/10 bg-[#171719]/80 p-4 font-roboto shadow-[0_18px_55px_rgba(0,0,0,0.22)] transition-all hover:-translate-y-1 hover:border-blue/50 hover:bg-[#1d1d21]/85"
>
	<div
		class="relative flex h-24 w-24 min-w-24 overflow-hidden rounded-md border border-white/10 bg-[#111113] shadow-lg md:h-28 md:w-28 md:min-w-28"
	>
		<img
			src={resolveProjectThumbnailPath(project.name)}
			alt={project.name}
			class="h-full w-full object-cover"
		/>
	</div>
	<div class="flex min-w-0 flex-1 flex-col">
		<p class="text-2xl font-bold leading-tight text-white">{project.name}</p>
		<p class="pt-2 leading-6 text-gray">{project.description}</p>
		{#if skillList.length}
			<div class="flex flex-wrap gap-2 pt-4">
				{#each skillList as skill}
					<span
						class="rounded-md border border-white/10 bg-white/[0.06] px-3 py-1 text-sm font-medium text-bluegray"
						>{skill}</span
					>
				{/each}
			</div>
		{/if}
	</div>
</a>

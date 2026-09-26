<script lang="ts">
	import PrizeBadge from './PrizeBadge.svelte';

	let { project, hero = false }: { project: App.Project; hero?: boolean } = $props();

	const covers = $derived(project.covers ?? []);
	const skillList = $derived(
		project.skills ? project.skills.split(',').map((skill) => skill.trim()) : []
	);
</script>

<a
	href={project.href}
	class="group relative flex overflow-hidden rounded-md border border-white/10 bg-[#111113] font-roboto shadow-[0_18px_55px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-blue/50 hover:shadow-[0_24px_70px_rgba(82,146,255,0.18)] {hero
		? 'min-h-[22rem] md:col-span-2 md:min-h-[26rem]'
		: 'min-h-[22rem]'}"
>
	{#each covers as cover, index}
		<img
			src={cover}
			alt={index === 0 ? project.name : ''}
			loading={hero ? 'eager' : 'lazy'}
			class="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 {index ===
			0
				? ''
				: 'opacity-0 group-hover:opacity-100'}"
		/>
	{/each}

	<div
		class="to-transparent absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/55 transition-opacity duration-500 group-hover:opacity-90"
	></div>

	{#if project.prize}
		<div class="absolute left-4 top-4">
			<PrizeBadge prize={project.prize} />
		</div>
	{/if}

	<div class="relative mt-auto flex w-full flex-col p-5 pt-16 md:p-6 md:pt-16">
		<p
			class="font-bold leading-tight text-white transition-colors group-hover:text-blue {hero
				? 'text-3xl md:text-5xl'
				: 'text-2xl md:text-3xl'}"
		>
			{project.name}
		</p>
		<p class="pt-2 leading-6 text-gray {hero ? 'md:text-lg' : ''}">{project.description}</p>
		{#if skillList.length}
			<div class="flex flex-wrap gap-2 pt-4">
				{#each skillList as skill}
					<span
						class="rounded-md border border-white/10 bg-[#0d0d0d]/60 px-3 py-1 text-sm font-medium text-bluegray backdrop-blur-sm"
						>{skill}</span
					>
				{/each}
			</div>
		{/if}
	</div>
</a>

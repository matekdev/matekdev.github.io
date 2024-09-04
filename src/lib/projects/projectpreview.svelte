<script lang="ts">
	import { resolveProjectThumbnailPath } from '$lib/Utils';
	import Icon from '@iconify/svelte';

	export let project: App.Project;
</script>

<a
	href={project.href}
	class="flex items-center py-4 font-roboto transition-all hover:-translate-y-1 md:p-4"
>
	<img
		src={resolveProjectThumbnailPath(project.name)}
		alt={project.name}
		class="mr-2 aspect-square h-[100px] w-[100px] rounded-lg"
	/>
	<div class="flex flex-col justify-center">
		<p class="text-xl font-medium text-white">{project.name}</p>
		<p class="text-white">{project.description}</p>
		<p class="text-gray">{project.skills}</p>
		{#if project.prize}
			<div class="text-yellow flex font-medium">
				<Icon icon="material-symbols:trophy" class="self-center text-xl"></Icon>
				<p>${project.prize} USD</p>
			</div>
		{/if}
	</div>
</a>

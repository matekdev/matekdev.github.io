<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import Project from '$lib/projects/projectpreview.svelte';
	import { ProjectData } from './projectdata';
</script>

<Section>
	<div class="font-roboto">
		<div class="flex flex-col gap-2 pb-6">
			<p class="text-4xl font-bold text-white">Projects & Contributions</p>
		</div>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each ProjectData as project}
				<Project {project} />
			{/each}
		</div>
	</div>
</Section>

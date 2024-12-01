<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import Project from '$lib/projects/projectpreview.svelte';
	import { ProjectData } from './projectdata';
</script>

<Section>
	<div class="font-roboto">
		<p class="pb-2 text-3xl text-white">Projects & Contributions</p>
		<div class="grid grid-cols-1 md:grid-cols-2">
			{#each ProjectData as project}
				<Project {project} />
			{/each}
		</div>
	</div>
</Section>

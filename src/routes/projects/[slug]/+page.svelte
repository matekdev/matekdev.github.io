<script lang="ts">
	import DiscordEmbed from '$lib/components/DiscordEmbed.svelte';
	import Fly from '$lib/components/Fly.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { ProjectData } from '$lib/projects/projectdata.js';
	import Projectpage from '$lib/projects/projectpage.svelte';

	export let data;

	function pageTitle() {
		return `Matthew Zegar | ${data.metadata.name}`;
	}

	function projectDescription() {
		const result = ProjectData.find((p) => p.name === data.metadata.name);
		if (result) return result.description;
		return `${data.metadata.name} built with ${data.metadata.skills}`;
	}
</script>

<PageTitle title={pageTitle()} />
<DiscordEmbed
	title={pageTitle()}
	description={projectDescription()}
	img="/projects/thumbnails/{data.metadata.name.toLowerCase().replaceAll(' ', '_')}.jpg"
/>

<Fly>
	<Projectpage page={data} />
</Fly>

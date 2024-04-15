<script lang="ts">
	import DiscordEmbed from '$lib/components/DiscordEmbed.svelte';
	import Projectpage from '$lib/projects/projectpage.svelte';

	export let data;
</script>

<DiscordEmbed
	title="Matthew Zegar's Project"
	description="{data.metadata.title} built with {data.metadata.skills}"
	img="/projects/thumbnails/{data.metadata.title.toLowerCase().replaceAll(' ', '_')}.jpg"
/>

<Projectpage page={data} />

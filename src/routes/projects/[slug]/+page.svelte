<script lang="ts">
	import DiscordEmbed from '$lib/components/DiscordEmbed.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import Projectpage from '$lib/projects/projectpage.svelte';

	export let data;

	function pageTitle() {
		return `Matthew Zegar | ${data.metadata.title}`;
	}
</script>

<PageTitle title={pageTitle()} />
<DiscordEmbed
	title={pageTitle()}
	description="{data.metadata.title} built with {data.metadata.skills}"
	img="/projects/thumbnails/{data.metadata.title.toLowerCase().replaceAll(' ', '_')}.jpg"
/>

<Projectpage page={data} />

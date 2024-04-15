<script lang="ts">
	import { resolveProjectThumbnailPath } from '$lib/Utils.js';
	import Blogpost from '$lib/blog/blogpost.svelte';
	import DiscordEmbed from '$lib/components/DiscordEmbed.svelte';
	export let data;
</script>

<DiscordEmbed
	title="Matthew Zegar's Blog Post"
	description={resolveProjectThumbnailPath(data.metadata.title)}
	img="/home/lr.jpg"
/>

<Blogpost post={data} />

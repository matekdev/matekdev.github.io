<script lang="ts">
	import Blogpost from '$lib/blog/blogpost.svelte';
	import DiscordEmbed from '$lib/components/DiscordEmbed.svelte';
	export let data;
</script>

<DiscordEmbed
	title="Matthew Zegar's Blog Post"
	description={data.metadata.title}
	href="/"
	img="/home/lr.jpg"
/>

<Blogpost post={data} />

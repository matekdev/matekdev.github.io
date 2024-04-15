<script lang="ts">
	import Blog from '$lib/blog/blog.svelte';
	import DiscordEmbed from '$lib/components/DiscordEmbed.svelte';

	export let data;
</script>

<DiscordEmbed
	title="Matthew Zegar's Blog"
	description="Please go read my blog posts..."
	img="/home/lr.jpg"
/>

<Blog posts={data.posts} />

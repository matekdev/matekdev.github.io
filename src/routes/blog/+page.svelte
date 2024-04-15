<script lang="ts">
	import Blog from '$lib/blog/blog.svelte';
	import DiscordEmbed from '$lib/components/DiscordEmbed.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';

	export let data;

	const title = 'Matthew Zegar | Blog';
</script>

<PageTitle {title} />
<DiscordEmbed {title} description="Please go read my blog posts..." img="/home/lr.jpg" />

<Blog posts={data.posts} />

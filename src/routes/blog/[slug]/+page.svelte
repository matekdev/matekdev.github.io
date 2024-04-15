<script lang="ts">
	import Blogpost from '$lib/blog/blogpost.svelte';
	import DiscordEmbed from '$lib/components/DiscordEmbed.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	export let data;

	const title = 'Matthew Zegar | Blog Post';
</script>

<PageTitle {title} />
<DiscordEmbed {title} description={data.metadata.title} img="/home/lr.jpg" />

<Blogpost post={data} />

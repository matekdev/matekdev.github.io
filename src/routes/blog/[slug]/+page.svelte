<script lang="ts">
	import Blogpost from '$lib/blog/blogpost.svelte';
	import DiscordEmbed from '$lib/components/DiscordEmbed.svelte';
	import FlyIn from '$lib/components/FlyIn.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	export let data;

	const title = `Matthew Zegar | ${data.metadata.title}`;
</script>

<PageTitle {title} />
<DiscordEmbed {title} description={data.metadata.description} img="/home/me.jpg" />

<FlyIn>
	<Blogpost post={data} />
</FlyIn>

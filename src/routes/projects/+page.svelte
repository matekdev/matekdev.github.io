<script>
	import DiscordEmbed from '$lib/components/DiscordEmbed.svelte';
	import FlyIn from '$lib/components/FlyIn.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import Projects from '$lib/projects/projects.svelte';

	const title = 'Matthew Zegar | Projects';
</script>

<PageTitle {title} />
<DiscordEmbed {title} description="A showcase of all my personal projects..." img="/home/me.jpg" />

<FlyIn>
	<Projects />
</FlyIn>

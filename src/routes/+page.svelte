<script>
	import PageTitle from '$lib/components/PageTitle.svelte';
	import DiscordEmbed from '$lib/components/DiscordEmbed.svelte';
	import Education from '$lib/home/education/education.svelte';
	import Header from '$lib/home/header/header.svelte';
	import Jobs from '$lib/home/jobs/jobs.svelte';
	import FlyIn from '$lib/components/FlyIn.svelte';
	import Section from '$lib/components/Section.svelte';

	const title = 'Matthew Zegar | Home';
</script>

<PageTitle {title} />
<DiscordEmbed {title} description="The personal website of Matthew Zegar" img="/home/me.jpg" />

<FlyIn>
	<Header />

	<Section>
		<Jobs />
	</Section>

	<Section>
		<Education />
	</Section>
</FlyIn>

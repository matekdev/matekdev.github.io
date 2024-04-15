<script>
	import DiscordEmbed from '$lib/components/DiscordEmbed.svelte';
	import Aboutme from '$lib/home/aboutme/aboutme.svelte';
	import Education from '$lib/home/education/education.svelte';
	import Header from '$lib/home/header/header.svelte';
	import Jobs from '$lib/home/jobs/jobs.svelte';
</script>

<DiscordEmbed
	title="Matthew Zegar's Page"
	description="The personal website of Matthew Zegar"
	href="/"
	img="home/lr.jpg"
/>

<Header />
<Aboutme />
<Jobs />
<Education />

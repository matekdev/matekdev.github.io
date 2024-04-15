<script>
	import DiscordEmbed from '$lib/components/DiscordEmbed.svelte';
	import Aboutme from '$lib/home/aboutme/aboutme.svelte';
	import Education from '$lib/home/education/education.svelte';
	import Header from '$lib/home/header/header.svelte';
	import Jobs from '$lib/home/jobs/jobs.svelte';
</script>

<DiscordEmbed
	title="Matthew Zegar's Website"
	description="The personal website of Matthew Zegar"
	img="/home/lr.jpg"
/>

<Header />
<Aboutme />
<Jobs />
<Education />

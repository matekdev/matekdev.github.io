<script lang="ts">
	import Experience from '$lib/home/experience/experience.svelte';

	const educations: App.Experience[] = [
		{
			name: 'Simon Fraser University',
			subheading: 'Bachelors of Science, Computer Science',
			location: 'Burnaby, Canada',
			startDate: '2017-09-14',
			endDate: '2023-04-20',
			href: 'https://www.sfu.ca/',
			accomplishments: [
				'Spent 2+ years interning at various companies (NVIDIA, HomeX, Kabam)',
				'Awarded Co-operative Education Computing Science Certificate'
			]
		}
	];
</script>

<div class="font-roboto">
	<p class="pb-2 text-3xl text-white">Education</p>
	<div class="flex flex-col gap-4">
		{#each educations as experience}
			<Experience {experience} />
		{/each}
	</div>
</div>

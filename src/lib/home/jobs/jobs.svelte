<script lang="ts">
	import Experience from '$lib/home/experience/experience.svelte';

	const jobs: App.Experience[] = [
		{
			name: 'Kijiji',
			subheading: 'Software Developer',
			location: 'Toronto, Canada',
			startDate: '2023-12-18',
			href: 'https://www.kijiji.ca/',
			skills: 'Java'
		},
		{
			name: 'NVIDIA',
			subheading: 'Software Intern',
			location: 'Remote',
			startDate: '2021-01-04',
			endDate: '2021-12-30',
			href: 'https://www.nvidia.com/',
			skills: 'C++, TypeScript, CUDA, Node.js, React.js, JavaScript'
		},
		{
			name: 'HomeX',
			subheading: 'Mobile Developer Intern',
			location: 'Toronto',
			startDate: '2020-05-18',
			endDate: '2020-12-14',
			href: 'https://homex.com/',
			skills: 'Flutter, Dart'
		},
		{
			name: 'Kabam',
			subheading: 'Software Developer Intern',
			location: 'Vancouver, Canada',
			startDate: '2019-05-18',
			endDate: '2019-12-14',
			href: 'https://kabam.com/',
			skills: 'C#, Unity, jQuery, JavaScript'
		}
	];
</script>

<div class="py-4 font-roboto">
	<p class="text-3xl pb-2 text-white">Work Experience</p>
	<div class="flex flex-col gap-4">
		{#each jobs as job}
			<Experience experience={job} />
		{/each}
	</div>
</div>

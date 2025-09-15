<script lang="ts">
	import Experience from '$lib/home/experience/experience.svelte';

	const jobs: App.Experience[] = [
		{
			name: 'Autodesk',
			subheading: 'Software Developer II',
			location: 'Vancouver, Canada',
			startDate: '2025-01-06',
			href: 'https://www.autodesk.com/'
		},
		{
			name: 'Small Fish',
			subheading: 'Programming Lead',
			location: 'Remote',
			startDate: '2023-08-01',
			href: 'https://smallfi.sh/'
		},
		{
			name: 'Kijiji',
			subheading: 'Back-end Software Developer',
			location: 'Toronto, Canada',
			startDate: '2023-10-01',
			endDate: '2024-10-01',
			href: 'https://www.kijiji.ca/'
		},
		{
			name: 'NVIDIA',
			subheading: 'Software Intern',
			location: 'Remote',
			startDate: '2021-05-01',
			endDate: '2021-12-30',
			href: 'https://www.nvidia.com/',
			additionalRoles: [
				{
					subheading: 'Performance Lab Intern',
					location: 'Remote',
					startDate: '2021-01-01',
					endDate: '2021-05-14'
				}
			]
		},
		{
			name: 'HomeX',
			subheading: 'Mobile Developer Intern',
			location: 'Remote',
			startDate: '2020-05-18',
			endDate: '2020-12-14',
			href: 'https://homex.com/'
		},
		{
			name: 'Kabam',
			subheading: 'Software Developer Intern',
			location: 'Vancouver, Canada',
			startDate: '2019-05-18',
			endDate: '2019-12-14',
			href: 'https://kabam.com/'
		}
	];
</script>

<div class="font-roboto">
	<p class="pb-2 text-3xl text-white">Work Experience</p>
	<div class="flex flex-col gap-4">
		{#each jobs as job}
			<Experience experience={job} />
		{/each}
	</div>
	<a
		href="https://www.linkedin.com/in/matthewzegar/"
		class="flex justify-center pt-4 text-center text-blue transition-all hover:text-darkblue"
		>Read more about my work experiences on Linkedin</a
	>
</div>

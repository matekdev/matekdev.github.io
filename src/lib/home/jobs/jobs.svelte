<script lang="ts">
	import Experience from '$lib/home/experience/experience.svelte';

	const jobs: App.Experience[] = [
		{
			name: 'Autodesk',
			subheading: 'Software Developer II',
			location: 'Vancouver, Canada',
			startDate: '2025-01-06',
			href: 'https://www.autodesk.com/',
			skills: 'C++, C#'
		},
		{
			name: 'Small Fish',
			subheading: 'Programming Lead (Part-time)',
			location: 'Remote',
			startDate: '2023-08-01',
			href: 'https://smallfi.sh/',
			skills: 'C#, s&box'
		},
		{
			name: 'Kijiji',
			subheading: 'Back-end Software Developer',
			location: 'Toronto, Canada',
			startDate: '2023-10-01',
			endDate: '2024-10-01',
			href: 'https://www.kijiji.ca/',
			skills: 'Java, Google Cloud Platform'
		},
		{
			name: 'NVIDIA',
			subheading: 'Software Intern',
			location: 'Remote',
			startDate: '2021-05-01',
			endDate: '2021-12-30',
			href: 'https://www.nvidia.com/',
			skills: 'C++, TypeScript, React, Node.js',
			additionalRoles: [
				{
					subheading: 'Performance Lab Intern',
					location: 'Remote',
					startDate: '2021-01-01',
					endDate: '2021-05-14',
					skills: 'Game Testing, Benchmarking, C#, Python'
				}
			]
		},
		{
			name: 'HomeX',
			subheading: 'Mobile Developer Intern',
			location: 'Remote',
			startDate: '2020-05-18',
			endDate: '2020-12-14',
			href: 'https://homex.com/',
			skills: 'Flutter, Dart'
		},
		{
			name: 'Kabam',
			subheading: 'Software Engineer Intern',
			location: 'Vancouver, Canada',
			startDate: '2019-05-18',
			endDate: '2019-12-14',
			href: 'https://kabam.com/',
			skills: 'C#, JavaScript, Unity'
		}
	];
</script>

<div class="font-roboto">
	<p class="pb-4 text-3xl font-bold text-white">Work Experience</p>
	<div class="flex flex-col gap-3">
		{#each jobs as job}
			<Experience experience={job} />
		{/each}
	</div>
	<a
		href="https://www.linkedin.com/in/matthewzegar/"
		class="flex justify-center pt-5 text-center font-medium text-blue transition-all hover:text-white"
		>Read more about my work experience on Linkedin</a
	>
</div>

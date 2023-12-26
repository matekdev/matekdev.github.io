<script lang="ts">
	import Divider from '$lib/home/divider/divider.svelte';
	import Icon from '@iconify/svelte';

	interface Link {
		icon: string;
		href: string;
	}

	const links: Link[] = [
		{
			icon: 'mdi:github',
			href: 'https://github.com/matekdev'
		},
		{
			icon: 'mdi:linkedin',
			href: 'https://www.linkedin.com/in/matthewzegar/'
		},
		{
			icon: 'mdi:gmail',
			href: 'mailto:matthewzegar@gmail.com'
		}
	];
</script>

<header class="flex flex-col">
	<div class="flex pb-4">
		<img src="/home/lr.jpg" class="mr-3 h-[100px] w-[100px] rounded-lg" alt="Low Roar Album" />
		<div class="flex flex-col justify-center">
			<div class="font-roboto text-white transition-all">
				<h1 class="text-2xl font-bold md:text-3xl">Matthew Zegar</h1>
				<h2 class="text-md text-gray">Software Engineer</h2>
			</div>
			<div class="flex gap-1 text-[25px]">
				{#each links as link}
					<a href={link.href} class="text-blue transition-all hover:text-darkblue"
						><Icon icon={link.icon} /></a
					>
				{/each}
			</div>
		</div>
	</div>
	<Divider />
</header>

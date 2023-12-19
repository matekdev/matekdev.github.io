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
		<img src="/home/lr.jpg" class="h-[100px] w-[100px] rounded-lg mr-3" alt="Low Roar Album" />
		<div class="flex flex-col justify-center">
			<div class="text-white transition-all font-roboto">
				<h1 class="text-2xl md:text-3xl font-bold">Matthew Zegar</h1>
				<h2 class="text-gray text-md">Software Developer</h2>
			</div>
			<div class="flex text-[25px] gap-1">
				{#each links as link}
					<a href={link.href} class="text-blue hover:text-darkblue transition-all"
						><Icon icon={link.icon} /></a
					>
				{/each}
			</div>
		</div>
	</div>
	<Divider />
</header>

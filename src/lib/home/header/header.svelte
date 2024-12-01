<script lang="ts">
	import Tooltip from '$lib/components/Tooltip.svelte';
	import Icon from '@iconify/svelte';

	interface Link {
		icon: string;
		href: string;
		tooltip: string;
	}

	const links: Link[] = [
		{
			icon: 'mdi:github',
			href: 'https://github.com/matekdev',
			tooltip: 'GitHub'
		},
		{
			icon: 'mdi:linkedin',
			href: 'https://www.linkedin.com/in/matthewzegar/',
			tooltip: 'Linkedin'
		},
		{
			icon: 'mdi:gmail',
			href: 'mailto:matthewzegar@gmail.com',
			tooltip: 'Email'
		}
	];
</script>

<header class="flex flex-col">
	<div class="flex">
		<div class="relative mr-3">
			<img src="/home/me.jpg" class="h-auto w-[100px] rounded-lg" alt="My face" />
			<div class="absolute bottom-[-15px] flex w-full justify-center text-3xl">
				<Icon icon="openmoji:flag-poland" />
				<Icon icon="openmoji:flag-canada" />
			</div>
		</div>
		<div class="flex flex-col justify-center">
			<div class="font-roboto text-white transition-all">
				<h1 class="text-nowrap text-2xl font-bold md:text-3xl">Matthew Zegar</h1>
				<h2 class="text-md text-gray">Software Engineer</h2>
			</div>
			<div class="flex gap-1 text-[25px]">
				{#each links as link}
					<Tooltip text={link.tooltip}>
						<a href={link.href} class="text-blue transition-all hover:text-darkblue"
							><Icon icon={link.icon} /></a
						>
					</Tooltip>
				{/each}
			</div>
		</div>
	</div>
</header>

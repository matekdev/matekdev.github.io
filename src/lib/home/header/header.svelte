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

<header class="relative pb-6 pt-0 md:pb-8">
	<div class="max-w-3xl">
		<div class="flex flex-wrap items-end gap-x-4 gap-y-2">
			<h1 class="text-5xl font-bold leading-[0.95] text-white md:text-7xl">Matthew Zegar</h1>
			<div class="flex pb-1 text-3xl md:text-4xl" aria-label="Polish and Canadian flags">
				<Icon icon="openmoji:flag-poland" />
				<Icon icon="openmoji:flag-canada" />
			</div>
		</div>
		<h2 class="pt-4 text-xl text-gray md:max-w-xl md:text-2xl">
			Software engineer specializing in software, graphics, performance, and games.
		</h2>

		<div class="flex gap-3 pt-6 text-2xl">
			{#each links as link}
				<Tooltip text={link.tooltip}>
					<a
						href={link.href}
						class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-blue transition-all hover:-translate-y-0.5 hover:border-blue/50 hover:text-white"
						><Icon icon={link.icon} /></a
					>
				</Tooltip>
			{/each}
		</div>
	</div>
</header>

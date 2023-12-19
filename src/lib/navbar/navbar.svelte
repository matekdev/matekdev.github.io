<script lang="ts">
	import Icon from '@iconify/svelte';
	import Navbutton from './navbutton.svelte';
	import { slide } from 'svelte/transition';
	import { navigating } from '$app/stores';

	interface Link {
		icon: string;
		text: string;
		href: string;
	}

	const links: Link[] = [
		{
			icon: 'material-symbols:deployed-code-outline',
			text: 'Projects',
			href: '/projects'
		},
		{
			icon: 'ic:round-newspaper',
			text: 'Blog',
			href: '/blog'
		}
	];

	let isMenuExpanded: boolean = false;
	$: if ($navigating) isMenuExpanded = false;
</script>

<nav class="flex flex-col py-4">
	<div class="flex justify-between">
		<div>
			<Navbutton icon="ic:round-terminal" text="matek.dev" href="/" />
		</div>
		<div class="flex gap-5 hidden md:flex">
			{#each links as link}
				<Navbutton icon={link.icon} text={link.text} href={link.href} />
			{/each}
		</div>
		<button
			class="flex md:hidden self-center hover:cursor-pointer"
			on:click={() => (isMenuExpanded = !isMenuExpanded)}
		>
			<Icon
				icon={!isMenuExpanded
					? 'material-symbols:menu-rounded'
					: 'material-symbols:menu-open-rounded'}
				class="transition-all text-blue text-3xl"
			/>
		</button>
	</div>
	{#if isMenuExpanded}
		<div transition:slide={{ duration: 300 }}>
			{#each links as link}
				<Navbutton icon={link.icon} text={link.text} href={link.href} />
			{/each}
		</div>
	{/if}
</nav>

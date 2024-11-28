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
			href: '/projects/'
		},
		{
			icon: 'ic:round-newspaper',
			text: 'Blog',
			href: '/blog/'
		}
	];

	let isMenuExpanded: boolean = false;
	$: if ($navigating) isMenuExpanded = false;
</script>

<nav class="flex flex-col py-3">
	<div class="flex justify-between">
		<div>
			<Navbutton icon="ic:round-terminal" text="matek.dev" href="/" />
		</div>
		<div class="flex hidden gap-2 md:flex">
			{#each links as link}
				<Navbutton icon={link.icon} text={link.text} href={link.href} />
			{/each}
		</div>
		<button
			class="bg-jetlight flex self-center rounded-lg px-2 py-1 hover:cursor-pointer md:hidden"
			on:click={() => (isMenuExpanded = !isMenuExpanded)}
		>
			<Icon
				icon={!isMenuExpanded
					? 'material-symbols:menu-rounded'
					: 'material-symbols:menu-open-rounded'}
				class="text-2xl text-blue transition-all"
			/>
		</button>
	</div>
	{#if isMenuExpanded}
		<div class="mt-3 flex flex-col gap-2" transition:slide={{ duration: 300 }}>
			{#each links as link}
				<div>
					<Navbutton icon={link.icon} text={link.text} href={link.href} />
				</div>
			{/each}
		</div>
	{/if}
</nav>

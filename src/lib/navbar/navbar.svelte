<script lang="ts">
	import Navbutton from './navbutton.svelte';

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
</script>

<nav class="flex justify-between py-4">
	<div><Navbutton icon="material-symbols:code-rounded" text="matek.dev" href="/" /></div>
	<div class="flex gap-5">
		{#each links as link}
			<Navbutton icon={link.icon} text={link.text} href={link.href} />
		{/each}
	</div>
</nav>

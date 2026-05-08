<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	let { icon = '', text, href }: { icon?: string; text: string; href: string } = $props();

	let isActive = $derived($page.url.pathname == href);
</script>

<a
	{href}
	class="flex rounded-lg bg-jetlight px-2 py-1 font-roboto text-xl font-medium text-blue transition-all hover:scale-105 hover:opacity-100 active:text-blue
	{!isActive ? 'text-darkblue' : ''}"
>
	{#if icon}
		<Icon {icon} class="mr-1 self-center"></Icon>
	{/if}
	<p>{text}</p>
</a>

<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	let { icon = '', text, href }: { icon?: string; text: string; href: string } = $props();

	let isActive = $derived($page.url.pathname == href);
</script>

<a
	{href}
	class="flex rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 font-roboto text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:border-blue/50 hover:text-blue active:text-blue
	{!isActive ? 'text-gray' : ''}"
>
	{#if icon}
		<Icon {icon} class="mr-1 self-center"></Icon>
	{/if}
	<p>{text}</p>
</a>

<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	export let icon: string = '';
	export let text: string;
	export let href: string;

	$: isActive = $page.url.pathname == href;
</script>

<a
	{href}
	class="bg-jetlight flex rounded-lg px-2 py-1 font-roboto text-xl font-medium text-blue transition-all hover:text-darkblue hover:opacity-100 active:text-blue
	{!isActive ? 'opacity-50' : ''}"
>
	{#if icon}
		<Icon {icon} class="mr-1 self-center"></Icon>
	{/if}
	<p>{text}</p>
</a>

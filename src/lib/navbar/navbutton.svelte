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
	class="flex font-roboto text-xl font-medium text-blue transition-all hover:text-darkblue hover:opacity-100
	{!isActive ? 'opacity-50' : ''}"
>
	{#if icon}
		<Icon {icon} class="mr-1 self-center"></Icon>
	{/if}
	<p>{text}</p>
</a>

<script lang="ts">
	import Icon from '@iconify/svelte';

	export let icon: string = '';
	export let text: string;
	export let href: string;
</script>

<a
	{href}
	class="font-roboto hover:text-darkblue text-blue flex text-xl font-medium transition-all hover:scale-105"
>
	{#if icon}
		<Icon {icon} class="mr-1 self-center"></Icon>
	{/if}
	<p>{text}</p>
</a>

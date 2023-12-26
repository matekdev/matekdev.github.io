<script lang="ts">
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { fade } from 'svelte/transition';

	export let text: string;

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'bottom',
		middleware: [offset(4), flip(), shift()]
	});

	let showTooltip: boolean = false;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:mouseenter={() => (showTooltip = true)}
	on:mouseleave={() => (showTooltip = false)}
	use:floatingRef
>
	<slot />
</div>

{#if showTooltip}
	<div
		transition:fade={{ duration: 100 }}
		class="z-50 rounded-lg bg-white px-2 py-1 font-roboto text-sm font-medium text-jetblack"
		use:floatingContent
	>
		{text}
	</div>
{/if}

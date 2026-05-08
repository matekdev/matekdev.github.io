<script lang="ts">
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { fade } from 'svelte/transition';

	let { text, children }: { text: string; children: import('svelte').Snippet } = $props();

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'bottom',
		middleware: [offset(4), flip(), shift()]
	});

	let showTooltip: boolean = $state(false);
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onmouseenter={() => (showTooltip = true)}
	onmouseleave={() => (showTooltip = false)}
	use:floatingRef
>
	{@render children()}
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

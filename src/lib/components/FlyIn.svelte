<script>
	import { fly } from 'svelte/transition';

	let { children } = $props();
</script>

<div in:fly={{ y: 20, duration: 300 }}>
	{@render children()}
</div>

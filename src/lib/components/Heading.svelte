<script lang="ts">
	let { h = 'h2', title, caption = '' }: { h?: string; title: string; caption?: string } = $props();
</script>

<div>
	<a href={`#${title}`} target="_self">
		<svelte:element this={h} id={title} class:caption>{title}</svelte:element></a
	>
	{#if caption}
		<p>{caption}</p>
	{/if}
</div>

<style>
	.caption {
		margin-bottom: 0px;
	}

	a {
		text-decoration: none;
	}

	p {
		margin-top: 0px;
	}
</style>

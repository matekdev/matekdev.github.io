<script lang="ts">
	import { page } from '$app/stores';

	let { src, caption = '', href = '', alt = '' }: { src: string; caption?: string; href?: string; alt?: string } = $props();

	function resolvePath(src: string) {
		// Crappy code, who cares.
		const directory = $page.route.id?.includes('projects') ? 'projects' : 'blog';
		return src.startsWith('http://') || src.startsWith('https://')
			? src
			: `/markdown/${directory}/${$page.params.slug}/${src}`;
	}
</script>

<div class="text-center">
	<img
		class="mx-auto mb-0 flex justify-center rounded-lg"
		class:caption-img={caption}
		src={resolvePath(src)}
		alt={alt ? alt : src}
	/>
	{#if caption}
		{#if href}
			<a {href} style="margin-top: 0px;">{caption}</a>
		{:else}
			<p style="margin-top: 0px;">{caption}</p>
		{/if}
	{/if}
</div>

<style>
	.caption-img {
		margin-bottom: 0px;
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';

	export let src: string;
	export let caption: string;
	export let href: string = '';
	export let alt: string = '';

	function resolvePath(src: string) {
		return src.startsWith('http://') || src.startsWith('https://')
			? src
			: `/markdown/${$page.params.slug}/${src}`;
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

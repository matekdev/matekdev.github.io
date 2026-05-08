<script lang="ts">
	import { page } from '$app/stores';

	let {
		src,
		caption = '',
		href = '',
		alt = ''
	}: { src: string; caption?: string; href?: string; alt?: string } = $props();

	function resolvePath(src: string) {
		// Crappy code, who cares.
		const directory = $page.route.id?.includes('projects') ? 'projects' : 'blog';
		return src.startsWith('http://') || src.startsWith('https://')
			? src
			: `/markdown/${directory}/${$page.params.slug}/${src}`;
	}
</script>

<figure class="not-prose my-6 text-center">
	<img
		class="mx-auto block max-w-full rounded-md border border-white/10 bg-[#111113] shadow-[0_18px_55px_rgba(0,0,0,0.22)]"
		class:caption-img={caption}
		src={resolvePath(src)}
		alt={alt ? alt : src}
	/>
	{#if caption}
		{#if href}
			<figcaption>
				<a {href} class="mt-2 block text-sm leading-5 text-blue transition-all hover:text-white"
					>{caption}</a
				>
			</figcaption>
		{:else}
			<figcaption class="mt-2 text-sm leading-5 text-gray">{caption}</figcaption>
		{/if}
	{/if}
</figure>

<style>
	.caption-img {
		margin-bottom: 0px;
	}
</style>

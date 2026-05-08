<script lang="ts">
	import { page } from '$app/stores';

	let { src }: { src: string } = $props();

	function resolvePath(src: string) {
		// Crappy code, who cares.
		const directory = $page.route.id?.includes('projects') ? 'projects' : 'blog';
		return `/markdown/${directory}/${$page.params.slug}/${src}`;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_media_has_caption -->
<video
	class="not-prose mx-auto my-6 block max-w-full rounded-md border border-white/10 bg-[#111113] shadow-[0_18px_55px_rgba(0,0,0,0.22)]"
	controls
>
	<source src={resolvePath(src)} />
</video>

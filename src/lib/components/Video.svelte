<script lang="ts">
	import { page } from '$app/stores';

	let { src }: { src: string } = $props();

	function resolvePath(src: string) {
		// Crappy code, who cares.
		const directory = $page.route.id?.includes('projects') ? 'projects' : 'blog';
		return `/markdown/${directory}/${$page.params.slug}/${src}`;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-media-has-caption -->
<video class="mx-auto flex justify-center rounded-lg" controls>
	<source src={resolvePath(src)} />
</video>

<script lang="ts">
	import Blog from '$lib/blog/blog.svelte';

	export let data;
</script>

<Blog posts={data.posts} />

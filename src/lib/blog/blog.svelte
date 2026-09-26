<script lang="ts">
	import Icon from '@iconify/svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import Section from '$lib/components/Section.svelte';
	import PostHero from './posthero.svelte';
	import PostRow from './postrow.svelte';

	let { posts }: { posts: App.BlogPost[] } = $props();

	const latest = $derived(posts[0]);
	const groupedPosts = $derived(groupPostsByYear(posts.filter((post) => post !== latest)));

	function groupPostsByYear(posts: App.BlogPost[]) {
		const groupedPosts = new Map<string, App.BlogPost[]>();

		posts.forEach((post) => {
			const key = new Date(post.date).toLocaleString('default', { year: 'numeric' });
			if (!groupedPosts.has(key)) groupedPosts.set(key, []);
			groupedPosts.get(key)?.push(post);
		});

		return groupedPosts;
	}
</script>

<Section>
	<div class="flex items-center gap-3 pb-6">
		<h1 class="text-4xl font-bold text-white">Blog</h1>
		<Tooltip text="RSS Feed">
			<a
				href="/rss.xml"
				class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-lg text-blue transition-all hover:-translate-y-0.5 hover:border-blue/50 hover:text-white"
				><Icon icon="bi:rss" /></a
			>
		</Tooltip>
		<p class="ml-auto text-sm font-medium uppercase tracking-[0.08em] text-bluegray">
			{posts.length} posts
		</p>
	</div>
	{#if latest}
		<PostHero post={latest} />
	{/if}
</Section>

{#each groupedPosts.entries() as [year, postsInYear]}
	<Section>
		<div class="flex items-center gap-3 pb-4">
			<div class="h-px flex-1 bg-white/10"></div>
			<p class="text-xl font-bold text-bluegray">{year}</p>
			<div class="h-px flex-1 bg-white/10"></div>
		</div>
		<div class="grid grid-cols-1 gap-4">
			{#each postsInYear as post}
				<PostRow {post} />
			{/each}
		</div>
	</Section>
{/each}

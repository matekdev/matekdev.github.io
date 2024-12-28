<script lang="ts">
	import Icon from '@iconify/svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import Section from '$lib/components/Section.svelte';

	export let posts: App.BlogPost[];
	const groupedPosts = groupPostsByYear(posts);

	function groupPostsByYear(posts: App.BlogPost[]) {
		const groupedPosts = new Map<string, App.BlogPost[]>();

		posts.forEach((post) => {
			const key = new Date(post.date).toLocaleString('default', { year: 'numeric' });
			if (!groupedPosts.has(key)) groupedPosts.set(key, []);
			groupedPosts.get(key)?.push(post);
		});

		return groupedPosts;
	}

	function formatDate(date: string) {
		return new Date(date + 'T00:00:00').toLocaleString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

{#each groupedPosts.entries() as [year, postsInYear], index}
	<Section>
		{#if index == 0}
			<div class="flex items-center pb-4">
				<h1 class="mr-2 text-3xl text-white">Blog</h1>
				<Tooltip text="RSS Feed">
					<a href="/rss.xml" class="text-2xl text-blue transition-all hover:text-darkblue"
						><Icon icon="bi:rss" /></a
					>
				</Tooltip>
			</div>
		{/if}
		<div class="rounded-lg bg-darkblue px-4 py-2 text-xl font-bold text-jetblack">{year}</div>
		{#each postsInYear as post}
			<a
				href="/blog/{post.slug}"
				class="flex flex-col p-2 text-white transition-all hover:-translate-y-1 hover:text-gray"
			>
				<h1 class="text-xl underline">{post.title}</h1>
				{#if post.description}
					<p class="text-gray">{post.description}</p>
				{/if}
				<div class="flex items-center text-bluegray">
					<Icon icon="uis:calender" class="mb-1 mr-1" />
					<p>{formatDate(post.date)}</p>
				</div>
			</a>
		{/each}
	</Section>
{/each}

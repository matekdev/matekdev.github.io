<script lang="ts">
	import Icon from '@iconify/svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import Section from '$lib/components/Section.svelte';

	let { posts }: { posts: App.BlogPost[] } = $props();
	const groupedPosts = $derived(groupPostsByYear(posts));

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
			<div class="flex items-center gap-3 pb-6">
				<h1 class="text-4xl font-bold text-white">Blog</h1>
				<Tooltip text="RSS Feed">
					<a
						href="/rss.xml"
						class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-lg text-blue transition-all hover:-translate-y-0.5 hover:border-blue/50 hover:text-white"
						><Icon icon="bi:rss" /></a
					>
				</Tooltip>
			</div>
		{/if}
		<div class="flex items-center gap-3 pb-4">
			<div class="h-px flex-1 bg-white/10"></div>
			<p class="text-xl font-bold text-bluegray">{year}</p>
			<div class="h-px flex-1 bg-white/10"></div>
		</div>
		<div class="grid grid-cols-1 gap-4">
			{#each postsInYear as post}
				<a
					href="/blog/{post.slug}"
					class="group rounded-md border border-white/10 bg-[#171719]/80 p-4 shadow-[0_18px_55px_rgba(0,0,0,0.22)] transition-all hover:-translate-y-1 hover:border-blue/50 hover:bg-[#1d1d21]/85"
				>
					<div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
						<div class="min-w-0">
							<h2
								class="text-2xl font-bold leading-tight text-white transition-all group-hover:text-blue"
							>
								{post.title}
							</h2>
							{#if post.description}
								<p class="max-w-3xl pt-2 leading-6 text-gray">{post.description}</p>
							{/if}
						</div>
						<div
							class="flex min-w-fit items-center text-sm font-medium uppercase tracking-[0.08em] text-bluegray"
						>
							<Icon icon="uis:calender" class="mb-1 mr-1" />
							<p>{formatDate(post.date)}</p>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</Section>
{/each}

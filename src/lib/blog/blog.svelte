<script lang="ts">
	import Icon from '@iconify/svelte';

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
		return new Date(date + 'PST').toLocaleString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<div class="py-4 font-roboto">
	<p class="pb-4 text-3xl text-white">Blog</p>
	<div class="flex flex-col gap-3">
		{#each groupedPosts.entries() as [year, postsInYear]}
			<div class="rounded-lg bg-darkblue p-2 text-xl font-bold text-jetblack">{year}</div>
			{#each postsInYear as post}
				<a
					href="/blog/{post.slug}"
					class="flex flex-col p-2 font-roboto text-white transition-all hover:-translate-y-1 hover:text-gray"
				>
					<h1 class="text-xl underline">{post.title}</h1>
					{#if post.description}
						<p class="pb-1 text-gray">{post.description}</p>
					{/if}
					<div class="flex items-center text-gray">
						<Icon icon="uis:calender" class="mb-1 mr-1" />
						<p>{formatDate(post.date)}</p>
					</div>
				</a>
			{/each}
		{/each}
	</div>
</div>

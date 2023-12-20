<script lang="ts">
	import Icon from '@iconify/svelte';

	export let post: { metadata: App.BlogPost; content: any };

	function formatDate(date: string) {
		return new Date(date).toLocaleString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<article class="w-full py-4 pb-8 font-roboto">
	<h1 class="pb-1 text-3xl text-white">{post.metadata.title}</h1>
	<div class="flex items-center pb-4 text-white">
		<Icon icon="uis:calender" class="mb-1 mr-1" />
		<p>{formatDate(post.metadata.date)}</p>
	</div>
	<div class="flex w-full justify-center">
		<div class="prose prose-invert prose-headings:font-normal">
			<svelte:component this={post.content} />
		</div>
	</div>
</article>

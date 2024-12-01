<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import Icon from '@iconify/svelte';

	export let post: { metadata: App.BlogPost; content: any };

	function formatDate(date: string) {
		return new Date(date + 'PST').toLocaleString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<Section>
	<article class="w-full font-roboto">
		<h1 class="pb-1 text-3xl text-white">{post.metadata.title}</h1>
		<div class="flex items-center pb-4 text-bluegray">
			<Icon icon="uis:calender" class="mb-1 mr-1" />
			<p>{formatDate(post.metadata.date)}</p>
		</div>
		<div class="flex w-full justify-center">
			<div
				class="prose prose-invert prose-headings:font-normal prose-a:text-blue prose-a:no-underline hover:prose-a:text-darkblue hover:prose-a:transition-all"
			>
				<svelte:component this={post.content} />
			</div>
		</div>
	</article>
</Section>

<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import Icon from '@iconify/svelte';

	let { post }: { post: { metadata: App.BlogPost; content: any } } = $props();
	let Content = $derived(post.content);

	function formatDate(date: string) {
		return new Date(date + 'T00:00:00').toLocaleString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<Section>
	<article class="w-full font-roboto">
		<div
			class="mb-6 rounded-md border border-white/10 bg-[#171719]/80 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.22)] md:p-7"
		>
			<h1 class="text-4xl font-bold leading-tight text-white md:text-5xl">{post.metadata.title}</h1>
			{#if post.metadata.description}
				<p class="max-w-3xl pt-3 text-lg leading-7 text-gray">{post.metadata.description}</p>
			{/if}
			<div
				class="flex items-center pt-5 text-sm font-medium uppercase tracking-[0.08em] text-bluegray"
			>
				<Icon icon="uis:calender" class="mb-1 mr-1" />
				<p>{formatDate(post.metadata.date)}</p>
			</div>
		</div>
		<div class="flex w-full justify-center">
			<div
				class="prose prose-lg prose-invert prose-headings:font-bold prose-headings:text-white prose-p:leading-8 prose-a:text-blue prose-a:no-underline hover:prose-a:text-white hover:prose-a:transition-all prose-img:mx-auto prose-img:my-6 prose-img:rounded-md prose-img:border prose-img:border-white/10 prose-img:bg-[#111113] prose-img:shadow-[0_18px_55px_rgba(0,0,0,0.22)]"
			>
				<Content />
			</div>
		</div>
	</article>
</Section>

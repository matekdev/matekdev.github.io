<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import Icon from '@iconify/svelte';
	let { page }: { page: { metadata: App.ProjectPage; content: any } } = $props();
	let Content = $derived(page.content);
</script>

<Section>
	<article class="w-full font-roboto">
		<div class="flex items-center">
			<h1 class="mr-2 text-3xl text-white">{page.metadata.name}</h1>
			{#if page.metadata.git}
				<Tooltip text="GitHub">
					<a href={page.metadata.git} class="text-2xl text-blue transition-all hover:text-darkblue"
						><Icon icon="mdi:github" /></a
					>
				</Tooltip>
			{/if}
		</div>
		<div class="flex flex-col pb-4">
			{#if page.metadata.skills}
				<p class="pb-2 text-gray"><span class="font-bold">Skills: </span>{page.metadata.skills}</p>
			{/if}
		</div>
		<div class="flex w-full flex-col justify-center">
			<div
				class="prose prose-invert prose-headings:font-normal prose-a:text-blue prose-a:no-underline hover:prose-a:text-darkblue hover:prose-a:transition-all"
			>
				<Content />
			</div>
		</div>
	</article>
</Section>

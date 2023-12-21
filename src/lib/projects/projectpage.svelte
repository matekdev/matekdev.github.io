<script lang="ts">
	export let page: { metadata: App.ProjectPage; content: any };
</script>

<article class="w-full py-4 pb-8 font-roboto">
	<h1 class="pb-1 text-3xl text-white">{page.metadata.title}</h1>
	<div class="flex w-full flex-col justify-center">
		<div
			class="prose prose-invert prose-headings:font-normal prose-a:text-blue prose-a:no-underline hover:prose-a:text-darkblue hover:prose-a:transition-all"
		>
			<svelte:component this={page.content} />
		</div>
	</div>
</article>

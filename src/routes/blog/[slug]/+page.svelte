<script lang="ts">
	import Icon from '@iconify/svelte';

	export let data;

	function formatDate(date: string) {
		return new Date(date).toLocaleString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<article class="w-full py-4 font-roboto">
	<h1 class="pb-1 text-3xl text-white">{data.metadata.title}</h1>
	<div class="flex items-center pb-4 text-white">
		<Icon icon="uis:calender" class="mb-1 mr-1" />
		<p>{formatDate(data.metadata.date)}</p>
	</div>
	<div class="flex w-full justify-center">
		<div class="prose prose-invert prose-headings:font-normal">
			<svelte:component this={data.content} />
		</div>
	</div>
</article>

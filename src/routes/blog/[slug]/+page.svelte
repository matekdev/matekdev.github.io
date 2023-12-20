<script lang="ts">
	export let data;
</script>

<article>
	<h1>{data.title}</h1>
	<p>Published: {data.date}</p>
	<div class="prose font-roboto">
		<svelte:component this={data.content} />
	</div>
</article>

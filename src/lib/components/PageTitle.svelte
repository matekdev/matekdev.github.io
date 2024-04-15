<script lang="ts">
	export let title: string;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
</svelte:head>

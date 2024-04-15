<script lang="ts">
	export let title: string;
	export let description: string = '';
	export let img: string = '';
</script>

<svelte:head>
	<meta content={title} property="og:title" />
	<meta content={description} property="og:description" />
	<meta content="/" property="og:url" />
	<meta content={img} property="og:image" />
	<meta content="#5292ff" data-react-helmet="true" name="theme-color" />
</svelte:head>

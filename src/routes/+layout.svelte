<script lang="ts">
	import Navbar from '$lib/navbar/navbar.svelte';
	import '../app.css';
	import '../syntax-highlight.css'; // https://github.com/PrismJS/prism-themes
</script>

<div class="fixed h-screen w-screen bg-jetblack" style="z-index: -5;" />

<div class="container mx-auto">
	<Navbar />
	<slot />
</div>

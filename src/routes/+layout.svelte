<script lang="ts">
	import Navbar from '$lib/navbar/navbar.svelte';
	import '../app.css';
</script>

<div class="bg-jetblack absolute h-screen w-screen" style="z-index: -5;" />

<div class="container mx-auto">
	<Navbar />
	<slot />
</div>

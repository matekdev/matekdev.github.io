<script lang="ts">
	import Navbar from '$lib/navbar/navbar.svelte';
	import '../app.css';
	import '../syntax-highlight.css'; // https://github.com/PrismJS/prism-themes
</script>

<div class="fixed grid h-screen w-screen" style="z-index: -5;" />

<div class="container mx-auto">
	<Navbar />
	<slot />
</div>

<style>
	.grid {
		background-color: #141416;
		opacity: 1;
		background-image: linear-gradient(
				#63636b11 0.7000000000000001px,
				transparent 0.7000000000000001px
			),
			linear-gradient(to right, #63636b11 0.7000000000000001px, #141416 0.7000000000000001px);
		background-size: 14px 14px;
	}
</style>

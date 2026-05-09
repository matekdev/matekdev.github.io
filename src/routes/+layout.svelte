<script lang="ts">
	import Navbar from '$lib/navbar/navbar.svelte';
	import '../app.css';
	import '../syntax-highlight.css'; // https://github.com/PrismJS/prism-themes

	let { children } = $props();
</script>

<div class="fixed grid h-screen w-screen bg-jetblack" style="z-index: -5;"></div>
<img
	src="/generic/msc1.webp"
	alt=""
	class="pointer-events-none fixed inset-x-0 top-0 h-[34rem] w-screen object-cover opacity-35 blur-sm saturate-[0.8] [mask-image:linear-gradient(to_bottom,black_0%,black_52%,rgba(0,0,0,0.6)_70%,transparent_100%)]"
	style="z-index: -4;"
/>
<div
	class="pointer-events-none fixed inset-x-0 top-0 h-[38rem] bg-gradient-to-b from-[#0d0d0f]/35 via-[#0d0d0f]/45 to-[#0d0d0f]"
	style="z-index: -3;"
></div>

<div class="container mx-auto min-h-screen pb-12">
	<Navbar />
	{@render children()}
</div>

<style>
	.grid {
		background-color: #0d0d0f;
		opacity: 1;
		background-image:
			linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0) 220px),
			radial-gradient(circle at 50% 0%, rgba(82, 146, 255, 0.16), transparent 34rem),
			radial-gradient(#ffffff14 0.7000000000000001px, #0d0d0f 0.7000000000000001px);
		background-size:
			auto,
			auto,
			18px 18px;
	}
</style>

<script lang="ts">
	import Navbar from '$lib/navbar/navbar.svelte';
	import '../app.css';
	import '../syntax-highlight.css'; // https://github.com/PrismJS/prism-themes

	let { children } = $props();
</script>

<img
	src="/generic/msc1.webp"
	alt=""
	class="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[45rem] w-full object-cover opacity-60 [mask-image:linear-gradient(to_bottom,black_0%,black_52%,rgba(0,0,0,0.6)_70%,transparent_100%)]"
/>
<div
	class="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[49rem] w-full bg-gradient-to-b from-[#0d0d0d]/55 via-[#0d0d0d]/60 to-[#0d0d0d]"
></div>

<div class="container relative z-10 mx-auto min-h-screen pb-12">
	<Navbar />
	{@render children()}
</div>

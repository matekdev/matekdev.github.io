<script lang="ts">
	import PostMeta from './postmeta.svelte';

	let { post }: { post: App.BlogPost } = $props();
</script>

<a
	href="/blog/{post.slug}"
	class="group relative flex min-h-[18rem] overflow-hidden rounded-md border border-white/10 bg-[#171719]/80 shadow-[0_18px_55px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-blue/50 hover:shadow-[0_24px_70px_rgba(82,146,255,0.18)] md:min-h-[22rem]"
>
	{#if post.cover}
		<img
			src={post.cover}
			alt=""
			class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent"
		></div>
	{:else}
		<div
			class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(82,146,255,0.2),transparent_60%)]"
		></div>
		<div
			class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]"
		></div>
	{/if}

	<span
		class="absolute left-5 top-5 rounded-md border border-blue/40 bg-[#0d0d0d]/70 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-blue backdrop-blur-sm md:left-6 md:top-6"
		>Latest post</span
	>

	<div class="relative mt-auto flex flex-col gap-3 p-5 pt-16 md:p-6 md:pt-16">
		<h2
			class="max-w-3xl text-3xl font-bold leading-tight text-white transition-colors group-hover:text-blue md:text-5xl"
		>
			{post.title}
		</h2>
		{#if post.description}
			<p class="max-w-2xl leading-6 text-gray md:text-lg">{post.description}</p>
		{/if}
		<PostMeta {post} />
	</div>
</a>

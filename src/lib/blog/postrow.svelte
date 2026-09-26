<script lang="ts">
	import PostMeta from './postmeta.svelte';

	let { post }: { post: App.BlogPost } = $props();
</script>

<a
	href="/blog/{post.slug}"
	class="group flex flex-col-reverse gap-4 rounded-md border border-white/10 bg-[#171719]/80 p-4 shadow-[0_18px_55px_rgba(0,0,0,0.22)] transition-all hover:-translate-y-1 hover:border-blue/50 hover:bg-[#1d1d21]/85 sm:flex-row sm:items-center"
>
	<div class="flex min-w-0 flex-1 flex-col gap-2">
		<h3 class="text-2xl font-bold leading-tight text-white transition-colors group-hover:text-blue">
			{post.title}
		</h3>
		{#if post.description}
			<p class="leading-6 text-gray">{post.description}</p>
		{/if}
		<PostMeta {post} />
	</div>
	{#if post.cover}
		<div
			class="aspect-video w-full overflow-hidden rounded-md border border-white/10 bg-[#111113] sm:w-44 sm:min-w-44"
		>
			<img
				src={post.cover}
				alt=""
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
		</div>
	{/if}
</a>

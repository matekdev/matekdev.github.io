<script lang="ts">
	import { formatPostDate } from '$lib/Utils';
	import Icon from '@iconify/svelte';

	let { post }: { post: App.BlogPost } = $props();
</script>

<div
	class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium uppercase tracking-[0.08em] text-bluegray"
>
	<span class="inline-flex items-center gap-1">
		<Icon icon="uis:calender" class="mb-0.5" />
		{formatPostDate(post.date)}
	</span>
	{#if post.readingTime}
		<span class="inline-flex items-center gap-1">
			<Icon icon="material-symbols:schedule-outline-rounded" />
			{post.readingTime} min read
		</span>
	{/if}
</div>

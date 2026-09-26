<script lang="ts">
	import Icon from '@iconify/svelte';

	let { prize }: { prize: string } = $props();
</script>

<span
	class="inline-flex items-center gap-1 rounded-md border border-yellow/40 bg-[#1a1608]/85 px-2.5 py-1 text-sm font-bold text-yellow shadow-[0_0_24px_rgba(238,186,48,0.18)] backdrop-blur-sm"
>
	<Icon icon="material-symbols:trophy" class="text-base" />
	${prize} prize
</span>

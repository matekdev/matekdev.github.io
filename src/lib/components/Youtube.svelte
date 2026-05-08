<script lang="ts">
	let { id }: { id: string } = $props();
</script>

<div
	class="video-container not-prose my-6 overflow-hidden rounded-md border border-white/10 bg-[#111113] shadow-[0_18px_55px_rgba(0,0,0,0.22)]"
>
	<iframe
		title="Youtube video"
		src={`https://www.youtube.com/embed/${id}`}
		frameborder="0"
		allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	></iframe>
</div>

<style>
	.video-container {
		overflow: hidden;
		position: relative;
		width: 100%;
	}

	.video-container::after {
		padding-top: 56.25%;
		display: block;
		content: '';
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>

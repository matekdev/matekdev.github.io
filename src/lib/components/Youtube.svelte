<script lang="ts">
	export let id: String;
</script>

<div class="video-container mb-4 overflow-hidden rounded-lg">
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

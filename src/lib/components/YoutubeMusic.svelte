<script lang="ts">
	let {
		src = '',
		width = '100%',
		height = '152px',
		iframe_styles = `
		border-radius: 0.8rem;
		height: ${height};
		width: ${width};
	`
	}: { src?: string; width?: string; height?: string; iframe_styles?: string } = $props();
</script>

<div class="ytmusic-embed-wrapper">
	<iframe
		data-testid="ytmusic"
		title={`ytmusic-${src}`}
		class="youtube-music-sveltekit-embed drop-shadow-md"
		src={`https://www.youtube.com/embed/${src}?autoplay=0&rel=0`}
		frameBorder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
		style={iframe_styles}
	></iframe>
</div>

<noscript>
	<style>
		.ytmusic-embed-wrapper {
			display: none !important;
		}
	</style>
</noscript>

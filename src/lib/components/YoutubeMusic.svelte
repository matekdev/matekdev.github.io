<script lang="ts">
	let {
		src = '',
		width = '100%',
		height = '152px',
		iframe_styles = `
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.375rem;
		height: ${height};
		box-shadow: 0 18px 55px rgba(0, 0, 0, 0.22);
		width: ${width};
	`
	}: { src?: string; width?: string; height?: string; iframe_styles?: string } = $props();
</script>

<div class="ytmusic-embed-wrapper not-prose my-6">
	<iframe
		data-testid="ytmusic"
		title={`ytmusic-${src}`}
		class="youtube-music-sveltekit-embed"
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

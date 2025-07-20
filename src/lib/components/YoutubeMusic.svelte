<script lang="ts">
	export let src: string = '';
	export let width: string = '100%';
	export let height: string = '152px';
	export let iframe_styles: string = `
		border-radius: 0.8rem;
		height: ${height};
		width: ${width};
	`;
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
	/>
</div>

<noscript>
	<style>
		.ytmusic-embed-wrapper {
			display: none !important;
		}
	</style>
</noscript>

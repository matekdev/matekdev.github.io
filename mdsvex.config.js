// The page title is already an <h1>, so markdown `#` renders as <h2>, `##` as <h3>, etc.
function shiftHeadings() {
	const walk = (node) => {
		if (node.type === 'heading') node.depth = Math.min(node.depth + 1, 6);
		node.children?.forEach(walk);
	};
	return (tree) => walk(tree);
}

export default {
	extensions: ['.md'],
	remarkPlugins: [shiftHeadings],
	// Prism has no Slang grammar; HLSL is the closest match.
	highlight: { alias: { slang: 'hlsl' } }
};

import type { EntryGenerator, PageLoad } from './$types';

const postFiles = import.meta.glob('/src/markdown/blogs/*.md');

export const entries: EntryGenerator = () =>
	Object.keys(postFiles).map((filePath) => ({
		slug: filePath.split('/').pop()?.replace(/\.md$/, '') ?? ''
	}));

export const load: PageLoad = async ({ params }) => {
	const post = await import(`../../../markdown/blogs/${params.slug}.md`);
	const metadata: App.BlogPost = post.metadata;
	const content = post.default;

	return {
		metadata,
		content
	};
};

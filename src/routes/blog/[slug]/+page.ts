import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = await import(`../../../blogs/${params.slug}.md`);
	const metadata: App.BlogPost = post.metadata;
	const content = post.default;

	return {
		metadata,
		content
	};
};

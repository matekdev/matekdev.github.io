import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = await import(`../../../markdown/projects/${params.slug}.md`);
	const metadata: App.ProjectPage = post.metadata;
	const content = post.default;

	return {
		metadata,
		content
	};
};

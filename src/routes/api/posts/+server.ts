import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts();

	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.date).valueOf() - new Date(a.date).valueOf();
	});

	return json(sortedPosts);
};

const fetchMarkdownPosts = async () => {
	const allPostFiles = import.meta.glob('/src/blogs/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts: App.BlogPost[] = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata }: any = await resolver();
			const postPath = path.slice(11, -3);

			return {
				slug: postPath,
				title: metadata.title,
				date: metadata.date
			};
		})
	);

	return allPosts;
};

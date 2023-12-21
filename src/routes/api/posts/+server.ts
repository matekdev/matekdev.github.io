import { json } from '@sveltejs/kit';
import path from 'path';

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts();

	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.date).valueOf() - new Date(a.date).valueOf();
	});

	return json(sortedPosts);
};

const fetchMarkdownPosts = async () => {
	const allPostFiles = import.meta.glob('/src/markdown/blogs/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts: App.BlogPost[] = await Promise.all(
		iterablePostFiles.map(async ([filePath, resolver]) => {
			const { metadata }: any = await resolver();
			const { name } = path.parse(filePath);

			return {
				slug: name,
				title: metadata.title,
				date: metadata.date
			};
		})
	);

	return allPosts;
};

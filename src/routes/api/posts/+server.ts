import { json } from '@sveltejs/kit';
import path from 'path';

export const prerender = true;

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts();

	const sortedPosts = allPosts.sort((a, b) => {
		if (a.date !== b.date) return new Date(b.date).valueOf() - new Date(a.date).valueOf();
		if (a.title > b.title) return -1;
		if (a.title < b.title) return 1;
		return 0;
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
				description: metadata.description,
				date: metadata.date
			};
		})
	);

	return allPosts;
};

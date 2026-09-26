import { json } from '@sveltejs/kit';
import fs from 'fs';
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

const rawPostFiles = import.meta.glob('/src/markdown/blogs/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

function readingTime(raw: string) {
	const body = raw.replace(/^---[\s\S]*?---/, '').replace(/<[^>]+>/g, '');
	const words = body.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 220));
}

// Frontmatter `cover` wins, otherwise the first local <Img> in the post.
function findCover(slug: string, raw: string, cover?: string) {
	const src = cover ?? raw.match(/<Img[^>]*\ssrc="([^"]+)"/)?.[1];
	if (!src) return undefined;
	if (src.startsWith('http')) return src;
	const publicPath = `/markdown/blog/${slug}/${src}`;
	return fs.existsSync(path.join('static', publicPath)) ? publicPath : undefined;
}

const fetchMarkdownPosts = async () => {
	const allPostFiles = import.meta.glob('/src/markdown/blogs/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts: App.BlogPost[] = await Promise.all(
		iterablePostFiles.map(async ([filePath, resolver]) => {
			const { metadata }: any = await resolver();
			const { name } = path.parse(filePath);
			const raw = rawPostFiles[filePath];

			return {
				slug: name,
				title: metadata.title,
				description: metadata.description,
				date: metadata.date,
				hidden: metadata.hidden ?? false,
				readingTime: readingTime(raw),
				cover: findCover(name, raw, metadata.cover)
			};
		})
	);

	return allPosts.filter((post) => !post.hidden);
};

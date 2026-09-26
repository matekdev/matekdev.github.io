export function resolveProjectThumbnailPath(projectName: string): string {
	const thumbnailName = projectName
		.toLowerCase()
		.replaceAll(':', '')
		.replaceAll(' ', '_');

	return `/projects/thumbnails/${thumbnailName}.webp`;
}

export function formatPostDate(date: string): string {
	return new Date(date + 'T00:00:00').toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
}

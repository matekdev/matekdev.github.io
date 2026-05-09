export function resolveProjectThumbnailPath(projectName: string): string {
	const thumbnailName = projectName
		.toLowerCase()
		.replaceAll(':', '')
		.replaceAll(' ', '_');

	return `/projects/thumbnails/${thumbnailName}.webp`;
}

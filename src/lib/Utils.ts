export function resolveProjectThumbnailPath(projectName: string): string {
	return `/projects/thumbnails/${projectName.toLowerCase().replaceAll(' ', '_')}.jpg`;
}

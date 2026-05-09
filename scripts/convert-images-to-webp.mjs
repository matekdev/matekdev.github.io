import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const staticDir = path.join(rootDir, 'static');
const markdownDir = path.join(rootDir, 'src', 'markdown');
const sourceExtensions = new Set(['.jpg', '.jpeg', '.png']);

async function exists(filePath) {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

async function walkFiles(dirPath) {
	const entries = await fs.readdir(dirPath, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const entryPath = path.join(dirPath, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await walkFiles(entryPath)));
			continue;
		}
		files.push(entryPath);
	}

	return files;
}

async function convertStaticImages() {
	if (!(await exists(staticDir))) {
		return { converted: 0, skipped: 0, convertedTargets: new Set() };
	}

	const files = await walkFiles(staticDir);
	let converted = 0;
	let skipped = 0;
	const convertedTargets = new Set();

	for (const filePath of files) {
		const ext = path.extname(filePath).toLowerCase();
		if (!sourceExtensions.has(ext)) continue;

		const outputPath = filePath.slice(0, -ext.length) + '.webp';

		try {
			const sourceStats = await fs.stat(filePath);
			let shouldConvert = true;

			if (await exists(outputPath)) {
				const outputStats = await fs.stat(outputPath);
				shouldConvert = outputStats.mtimeMs < sourceStats.mtimeMs;
			}

			if (!shouldConvert) {
				skipped += 1;
				convertedTargets.add(outputPath);
				continue;
			}

			await sharp(filePath).webp({ quality: 82, effort: 5 }).toFile(outputPath);
			converted += 1;
			convertedTargets.add(outputPath);
		} catch (error) {
			console.warn(`Failed to convert ${filePath}: ${error.message}`);
		}
	}

	return { converted, skipped, convertedTargets };
}

async function rewriteMarkdownImgSrc(convertedTargets) {
	if (!(await exists(markdownDir))) {
		return { updatedFiles: 0, updatedRefs: 0 };
	}

	const markdownFiles = (await walkFiles(markdownDir)).filter((filePath) =>
		filePath.endsWith('.md')
	);
	let updatedFiles = 0;
	let updatedRefs = 0;

	for (const filePath of markdownFiles) {
		const relative = path.relative(markdownDir, filePath);
		const [collectionRaw, nameRaw] = relative.split(path.sep);
		if (!collectionRaw || !nameRaw) continue;

		const slug = nameRaw.replace(/\.md$/, '');
		const collection = collectionRaw === 'blogs' ? 'blog' : collectionRaw;
		let content = await fs.readFile(filePath, 'utf8');
		let fileRefChanges = 0;

		content = content.replace(
			/<Img\s+([^>]*?)src="([^"\n]+?)"([^>]*)\/>/g,
			(match, beforeSrc, srcValue, afterSrc) => {
				if (/^https?:\/\//i.test(srcValue)) return match;

				const ext = path.extname(srcValue).toLowerCase();
				if (!sourceExtensions.has(ext)) return match;

				const webpValue = srcValue.slice(0, -ext.length) + '.webp';
				const staticWebpPath = path.join(staticDir, 'markdown', collection, slug, webpValue);
				if (!convertedTargets.has(staticWebpPath)) return match;

				fileRefChanges += 1;
				return `<Img ${beforeSrc}src="${webpValue}"${afterSrc} />`;
			}
		);

		if (fileRefChanges > 0) {
			await fs.writeFile(filePath, content, 'utf8');
			updatedFiles += 1;
			updatedRefs += fileRefChanges;
		}
	}

	return { updatedFiles, updatedRefs };
}

async function main() {
	const { converted, skipped, convertedTargets } = await convertStaticImages();
	const { updatedFiles, updatedRefs } = await rewriteMarkdownImgSrc(convertedTargets);

	console.log(`Converted: ${converted}`);
	console.log(`Skipped up-to-date: ${skipped}`);
	console.log(`Markdown files updated: ${updatedFiles}`);
	console.log(`Markdown image refs updated: ${updatedRefs}`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});

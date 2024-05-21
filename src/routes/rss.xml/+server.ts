export const prerender = true;

export async function GET({ fetch }) {
	const response = await fetch('/api/posts');
	const posts: App.BlogPost[] = await response.json();

	function escapeXML(s: string): string {
		return s.replace(/[<>&'"]/g, (c) => {
			switch (c) {
				case '<':
					return '&lt;';
				case '>':
					return '&gt;';
				case '&':
					return '&amp;';
				case '"':
					return '&quot;';
				case "'":
					return '&apos;';
				default:
					return c;
			}
		});
	}

	const headers = { 'Content-Type': 'application/xml' };
	const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>Matthew Zegar's Blog</title>
				<description>Random thoughts written by Matthew Zegar</description>
				<link>https://matek.dev/blog/</link>
				<atom:link href="https://matek.dev/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
					.map(
						(post) => `
						<item>
							<title>${escapeXML(post.title)}</title>
							<description>${escapeXML(post.title)}</description>
							<link>https://matek.dev/blog/${post.slug}</link>
							<guid isPermaLink="true">https://matek.dev/blog/${post.slug}</guid>
							<pubDate>${new Date(post.date).toUTCString()}</pubDate>
						</item>
					`
					)
					.join('')}
			</channel>
		</rss>
	`.trim();

	return new Response(xml, { headers });
}

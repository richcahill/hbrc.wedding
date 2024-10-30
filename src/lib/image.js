import { dev } from '$app/environment';

export function optimize(src, widths = [640, 960, 1280], quality = 90) {
	if (dev) return src; // Use original in development

	// For production, use absolute URL for Vercel's optimization
	const absoluteURL = `https://hbrc.wedding${src}`;

	return widths
		.slice()
		.sort((a, b) => a - b)
		.map((width, i) => {
			const url = `/_vercel/image?url=${encodeURIComponent(absoluteURL)}&w=${width}&q=${quality}`;
			const descriptor = i < widths.length - 1 ? ` ${width}w` : '';
			return url + descriptor;
		})
		.join(', ');
}

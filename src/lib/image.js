import { dev } from '$app/environment';

export function optimize(src, widths = [640, 960, 1280], quality = 90) {
	if (dev) return src; // Use original source in development

	// Ensure `src` is a relative path by removing any domain prefix
	if (src.startsWith('https://hbrc.wedding')) {
		src = src.replace('https://hbrc.wedding', '');
	}
	if (!src.startsWith('/')) {
		src = `/${src}`;
	}

	// Avoid encoding by passing `src` directly in URL
	return widths
		.slice()
		.sort((a, b) => a - b)
		.map((width, i) => {
			const url = `/_vercel/image?url=${src}&w=${width}&q=${quality}`;
			const descriptor = i < widths.length - 1 ? ` ${width}w` : '';
			return url + descriptor;
		})
		.join(', ');
}

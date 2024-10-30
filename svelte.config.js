import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			$lib: './src/lib',
			$stores: './src/stores',
			$routes: './src/routes'
		},
		adapter: adapter({
			images: {
				sizes: [640, 828, 1200, 1920, 3840],
				formats: ['image/avif', 'image/webp'],
				minimumCacheTTL: 300
			}
		})
	},
	preprocess: vitePreprocess()
};
export default config;

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
				formats: ['image/avif', 'image/webp', 'image/jpeg', 'image/png', 'image/gif', 'image/jpg'],
				minimumCacheTTL: 300,
				domains: ['example-app.vercel.app']
			}
		})
	},
	preprocess: vitePreprocess()
};
export default config;

// svelte.config.js
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-auto';
// adaper auto

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			$lib: './src/lib',
			$stores: './src/stores',
			$routes: './src/routes'
		},
		adapter: adapter()
	},
	preprocess: vitePreprocess()
};
export default config;

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

const repoName = '2Watuju'; // replace with actual repo name

export default defineConfig({
	plugins: [sveltekit(), viteCompression()],
	base: `/${repoName}/`
});

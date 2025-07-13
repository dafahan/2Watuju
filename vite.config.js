import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

const base = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(),viteCompression()],
	base

});

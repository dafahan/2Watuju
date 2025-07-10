import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const base = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	base

});

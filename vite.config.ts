import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { firstly } from 'firstly/vite';

import type { KIT_ROUTES } from '$lib/ROUTES';

export default defineConfig({
	server: {
		port: 5175
	},
	plugins: [
		firstly<KIT_ROUTES>({
			kitRoutes: {
				LINKS: { github: 'https://github.com/[owner]/[repo]' }
			}
		}),
		sveltekit()
	]
});

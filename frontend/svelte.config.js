import adapter from '@sveltejs/adapter-static';
import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
	},
	preprocess: sequence([
		// ... other preprocessors
		vitePreprocess(),
		preprocessMeltUI() // add to the end!
	])
};

export default config;

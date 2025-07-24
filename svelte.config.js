import adapter from '@sveltejs/adapter-static';

const base = process.env.PUBLIC_BASE_PATH || '';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null
    }),
    paths: {
      base
    },
    prerender: {
      handleHttpError: 'warn' // or 'fail' for stricter
    }
  }
};

export default config;

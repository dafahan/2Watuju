import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null, // or 'index.html' if SPA fallback is needed
      precompress: false
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/2watuju' : ''
    }
  }
};

export default config;
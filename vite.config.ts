import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';

function htmlEnvPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'html-env-injector',
    transformIndexHtml(html) {
      return html
        .replace(/%VITE_ADSENSE_CLIENT_ID%/g, env.VITE_ADSENSE_CLIENT_ID || '')
        .replace(/%VITE_INFOLINKS_PUB_ID%/g, env.VITE_INFOLINKS_PUB_ID || '')
        .replace(/%VITE_MEDIANET_SITE_ID%/g, env.VITE_MEDIANET_SITE_ID || '')
        .replace(/%VITE_MEDIANET_CID%/g, env.VITE_MEDIANET_CID || '');
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), htmlEnvPlugin(env)],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});


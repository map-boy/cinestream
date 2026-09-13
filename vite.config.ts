import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';

// Publisher ID published in /public/ads.txt. Used as a fallback so the AdSense
// snippet and the site-verification meta tag are always present in the built
// HTML, even if the deploy environment forgets to set VITE_ADSENSE_CLIENT_ID.
const DEFAULT_ADSENSE_CLIENT_ID = 'ca-pub-6727162627172885';

function stripBlock(html: string, marker: string): string {
  const pattern = new RegExp(`[ \\t]*<!-- ${marker} -->[\\s\\S]*?<!-- /${marker} -->\\n?`, 'g');
  return html.replace(pattern, '');
}

function htmlEnvPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'html-env-injector',
    transformIndexHtml(html) {
      const adsenseClient = env.VITE_ADSENSE_CLIENT_ID || DEFAULT_ADSENSE_CLIENT_ID;

      // Secondary ad networks only ship when they are actually configured.
      // Loading them with empty IDs produces broken third-party requests and
      // ad slots that never fill, which AdSense reviewers treat as a policy
      // problem ("no valuable inventory" / non-functional page elements).
      if (!env.VITE_INFOLINKS_PUB_ID) html = stripBlock(html, 'INFOLINKS_SCRIPT');
      if (!env.VITE_MEDIANET_CID) html = stripBlock(html, 'MEDIANET_SCRIPT');

      return html
        .replace(/%VITE_ADSENSE_CLIENT_ID%/g, adsenseClient)
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
      __ADSENSE_CLIENT_ID__: JSON.stringify(env.VITE_ADSENSE_CLIENT_ID || DEFAULT_ADSENSE_CLIENT_ID),
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

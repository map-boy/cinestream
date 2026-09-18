/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TMDB_API_KEY?: string;
  readonly VITE_ADSENSE_CLIENT_ID?: string;
  readonly VITE_AD_SLOTS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Injected by vite.config.ts so a publisher ID is always available. */
declare const __ADSENSE_CLIENT_ID__: string;

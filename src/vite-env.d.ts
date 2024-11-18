/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_URL: string;
  readonly APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

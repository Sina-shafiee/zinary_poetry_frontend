/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REST_API_URL: string;
  readonly GQL_API_URL: string;
  readonly VITE_APP_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

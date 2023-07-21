/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT?: number;
  readonly VITE_API_HOST: string;
  readonly VITE_MOCK_API?: string;
  readonly VITE_GRAASP_APP_ID: string;
  readonly VITE_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

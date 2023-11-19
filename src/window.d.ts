import { Database, LocalContext } from '@graasp/apps-query-client';

declare global {
  interface Window {
    appContext: LocalContext;
    Cypress: boolean;
    database: Database;
    apiErrors: object;
    EXCALIDRAW_ASSET_PATH: string;
  }
}

export {};

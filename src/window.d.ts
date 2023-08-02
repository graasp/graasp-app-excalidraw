import { Database, LocalContext } from '@graasp/apps-query-client';

declare global {
  interface Window {
    appContext: LocalContext;
    Cypress: boolean;
    database: Database;
    apiErrors: object;
  }
}

export {};

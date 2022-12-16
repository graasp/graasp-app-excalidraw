import { Database, LocalContext } from '@graasp/apps-query-client';

declare global {
  // declare objects that we add to the window object so TypeScript does not complain
  interface Window {
    appContext: LocalContext;
    Cypress: boolean;
    database: Database;
    apiErrors: object;
  }
}

export {};

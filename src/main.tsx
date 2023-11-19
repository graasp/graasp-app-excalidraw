import React from 'react';
import ReactDOM from 'react-dom/client';

import { mockApi } from '@graasp/apps-query-client';

import * as Sentry from '@sentry/react';

import { MOCK_API } from './config/env';
import { generateSentryConfig } from './config/sentry';
import buildDatabase, { mockContext, mockMembers } from './data/db';
import './index.css';
import Root from './modules/Root';

Sentry.init({
  integrations: [new Sentry.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  ...generateSentryConfig(),
});

// setup mocked api for cypress or standalone app
/* istanbul ignore next */
if (MOCK_API) {
  // eslint-disable-next-line no-console
  console.info('API mocked.');
  mockApi({
    appContext: window.Cypress ? window.appContext : mockContext,
    database: window.Cypress
      ? window.database
      : buildDatabase(mockContext, mockMembers),
  });
}

window.EXCALIDRAW_ASSET_PATH = '/';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);

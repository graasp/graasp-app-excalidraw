// export const {
//   REACT_APP_GRAASP_DEVELOPER_ID,
//   REACT_APP_GRAASP_APP_ID,
//   REACT_APP_VERSION,
//   REACT_APP_GOOGLE_ANALYTICS_ID,
//   REACT_APP_MOCK_API,
//   REACT_APP_API_HOST,
// } = window.Cypress ? Cypress.env() : process.env;

// export const MOCK_API = REACT_APP_MOCK_API === 'true';
// export const GRAASP_APP_ID = REACT_APP_GRAASP_APP_ID;

const {
  VITE_GRAASP_APP_KEY,
  VITE_VERSION,
  VITE_SENTRY_ENV,
  VITE_SENTRY_DSN,
  VITE_GA_MEASUREMENT_ID,
  VITE_MOCK_API,
  VITE_API_HOST,
} = window.Cypress ? Cypress.env() : import.meta.env;

export const MOCK_API = VITE_MOCK_API === 'true';
export const GA_MEASUREMENT_ID = VITE_GA_MEASUREMENT_ID;
export const API_HOST = VITE_API_HOST;
export const VERSION = VITE_VERSION || 'latest';
export const GRAASP_APP_KEY = VITE_GRAASP_APP_KEY;
export const SENTRY_ENV = VITE_SENTRY_ENV;
export const SENTRY_DSN = VITE_SENTRY_DSN;

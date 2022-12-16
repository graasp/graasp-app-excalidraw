export const {
  REACT_APP_GRAASP_DEVELOPER_ID,
  REACT_APP_GRAASP_APP_ID,
  REACT_APP_VERSION,
  REACT_APP_GOOGLE_ANALYTICS_ID,
  REACT_APP_MOCK_API,
  REACT_APP_API_HOST,
} = window.Cypress ? Cypress.env() : process.env;

export const MOCK_API = REACT_APP_MOCK_API === 'true';

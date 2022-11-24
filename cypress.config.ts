/* eslint-disable global-require */
import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // return require('./cypress/plugins/index')(on, config);
    },
    baseUrl: `http://localhost:${process.env.PORT || 3000}`,
  },
});

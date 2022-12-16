/* eslint-disable global-require */
import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // return require('./cypress/plugins/index')(on, config);
    },
    baseUrl: `http://localhost:${process.env.PORT || 3000}`,
  },
});

require('dotenv').config();
const { defineConfig } = require('cypress');
const emailService = require('./cypress/support/emailService');


module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/*.spec.js",
    baseUrl: "https://www.realmadrid.com/en-US",
    setupNodeEvents(on, config) {
      on('task', {
        async sendEmail({ dateConfirmed, ticketsAvailable }) {
          try {
            await emailService.send(dateConfirmed, ticketsAvailable);
            return { success: true };
          } catch (error) {
            console.error('Email error:', error);
            return { success: false, error: error.message };
          }
        }
      });
      return config;
    }
  }
});

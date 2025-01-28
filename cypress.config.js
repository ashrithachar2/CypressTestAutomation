const { defineConfig } = require("cypress");

const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')

module.exports = defineConfig({

    reporter: 'cypress-mochawesome-reporter',


  e2e: {
    baseUrl :  "https://www.automationexercise.com/",

    chromeWebSecurity : false,
      

    setupNodeEvents(on, config) {

      require('cypress-mochawesome-reporter/plugin')(on);
      
      on('task', {downloadFile})
      // implement node event listeners here
    },
  },
});

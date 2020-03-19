// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import './commands'
import {accountData} from '../../protractor/e2e/data/account-data.mock';

Cypress.Cookies.defaults({
    whitelist: ['GETAFREE_AUTH_HASH_V2', 'GETAFREE_USER_ID']
});

const {email, password} = accountData;

before('login', function () {
    cy.loginByApi(email, password);
});

// Alternatively you can use CommonJS syntax:
// require('./commands')

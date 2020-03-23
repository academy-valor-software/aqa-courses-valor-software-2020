// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import Chainable = Cypress.Chainable;

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      compare(source: object, target: string): Chainable;
    }
  }
}

Cypress.Commands.add('compare', (source, target) => {
  const {name, income, country} = source;

  return cy.wrap(name).should('be.eq', target.name) &&
  cy.wrap(income).should('be.eq', target.income) &&
  cy.wrap(country).should('be.eq', target.country);
});

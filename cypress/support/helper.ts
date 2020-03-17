import Chainable = Cypress.Chainable;

export function isTextVisibleAndHaveText(element: Chainable<JQuery>, text: string) {
  element.should('contain', text).and('be.visible');
}


import Chainable = Cypress.Chainable;
import { incorrectCredentialsError, incorrectEmailError } from './models/login-data.mock';

export function isTextVisibleAndHaveText(element: Chainable<JQuery>, text: string) {
  element.should('contain', text).and('be.visible');
}

export function formatErrorMessage() {
  return 'Incorrect username or password provided.';
  return incorrectCredentialsError;
}

export function formatFormError() {
  return 'Please enter a valid username or email address.';
  return incorrectEmailError;
}

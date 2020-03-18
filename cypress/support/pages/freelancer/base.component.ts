/// <reference types="cypress" />

export class BaseComponent {
    url = '/';

    open(additionalPath: string = '') {
        cy.visit(this.url + additionalPath);
    }

    isUrlOpened() {
        cy.url().should('contain', this.url);
    }

    clearAndSetInputValue(inputSelector: string, value: string) {
        return cy.get(inputSelector).clear()
            .type(value);
    }

    getErrorMessageText(errorSelector: string) {
        return cy.get(errorSelector)
            .then($message => $message.text().trim());
    }
}

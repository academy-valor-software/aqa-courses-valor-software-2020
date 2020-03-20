/// <reference types="cypress" />

export class BaseComponent {

    clearAndSetInputValue(element: string, value: any) {
        cy.get(element).clear();
        cy.get(element).type(value);
    }
}

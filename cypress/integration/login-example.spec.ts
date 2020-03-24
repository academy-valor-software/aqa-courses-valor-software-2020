/// <reference types="cypress" />

xdescribe('Check login via api', () => {
    it('should be logged in', () => {
        cy.visit('');

        cy.title().should('contain', 'Dashboard');
    });
});

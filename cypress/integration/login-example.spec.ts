/// <reference types="cypress" />
import {accountData} from '../../protractor/e2e/data/account-data.mock';

const {email, password} = accountData;

describe('First spec', () => {
    it('123', () => {
        cy.loginByApi(email, password);
        cy.visit('');
        cy.title().should('contain', 'Dashboard');
    });
});

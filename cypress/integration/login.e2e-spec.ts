/// <reference types="Cypress" />

import { LoginPage } from '../support/pages/login.po';
import { accountCredentials } from '../support/helpers/account-data.mock';
import { loginErrorMsg } from '../support/helpers/login-data.mock';

describe('login form suite', function()  {

    const loginPage = new LoginPage();
    beforeEach(() => {
        loginPage.open();
    });

    it('should login successfully', function () {
        loginPage.fillForm(accountCredentials.email, accountCredentials.password);
        cy.url().should('eq', 'https://www.freelancer.com/dashboard');
    });

    it('should fail because of email with invalid format', function () {
        loginPage.fillForm('artembashlak@', 'password');
        cy.get(loginPage.formErrorMsg).contains(loginErrorMsg.invalidEmailFormatMsg);
        cy.url().should('include', 'login');
    });

    it('should fail because of incorrect email/password', function () {
        loginPage.fillForm('mail', 'password');
        cy.get(loginPage.alertErrorMsg).contains(loginErrorMsg.invalidEmailOrPassMsg);
        cy.url().should('include', 'login');
    });
});

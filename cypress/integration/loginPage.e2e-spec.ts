import {LoginPagePo} from '../support/pages/login-page.po';
import {emailErrorMsg, invalidLoginEmail, invalidLoginPassword, passwordErrorMsg} from '../fixtures/login-data.mock';

describe('Login functionality', function() {
    const loginPage = new LoginPagePo();

    beforeEach(function() {
        loginPage.openLoginPage();
    });

    it('should check incorrect email format validation', function() {
        const {username, password} = invalidLoginEmail;

        loginPage.login(username, password);

        loginPage.getEmailErrorMsg().should('contain', emailErrorMsg);
        cy.url().should('contain', loginPage.url);
    });

    it('should check incorrect password validation', function() {
       const {username, password} = invalidLoginPassword;

       loginPage.login(username, password);

       loginPage.getPasswordErrorMsg().should('contain', passwordErrorMsg);
        cy.url().should('contain', loginPage.url);
    });
});

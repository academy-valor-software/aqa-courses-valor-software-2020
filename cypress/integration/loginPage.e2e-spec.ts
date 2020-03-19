import {LoginPagePo} from '../support/pages/login-page.po';
import {invalidLoginEmail, invalidLoginPassword} from '../fixtures/login-data.mock';

describe('Login functionality', () => {
    const loginPage = new LoginPagePo();

    beforeEach(() => {
        loginPage.openLoginPage();
    });
    it('should check incorrect email format validation', () => {
        const {username, password} = invalidLoginEmail;
        const emailErrorMsg = 'Please enter a valid username or email address.';

        loginPage.loginWithInvalidEmail(username, password);

        loginPage.getEmailErrorMsg().should('contain', emailErrorMsg);
        cy.url().should('contain', '/login');
    });
    it('should check incorrect password validation', () => {
       const {username, password} = invalidLoginPassword;
       const passwordErrorMsg = 'Incorrect username or password provided.';

       loginPage.loginWithInvalidPassword(username, password);

       loginPage.getPasswordErrorMsg().should('contain', passwordErrorMsg);
        cy.url().should('contain', '/login');
    });
});

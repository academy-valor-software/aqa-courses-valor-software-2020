import {LoginPo} from '../support/pages/login.po';
import {getRandomString} from '../support/utils';

describe('Login with wrong creds', function () {
    const loginPage = new LoginPo();
    beforeEach(function () {
        loginPage.open();
        cy.fixture('loginCreds').as('loginCreds');
    });
    it('should alert with wrong email', function () {
        loginPage.loginForm(getRandomString(), `${this.loginCreds.password}`);
        loginPage.getErrorMessage().should('be.equal', `${this.loginCreds.wrongEmailAlert}`);
    });
    it('should alert with wrong password', function () {
        loginPage.loginForm(`${this.loginCreds.email}`, getRandomString());
        loginPage.getAlertMessage().should('be.equal', `${this.loginCreds.wrongPassAlert}`);
    });
});

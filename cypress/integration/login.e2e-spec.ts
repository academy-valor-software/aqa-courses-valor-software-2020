import {LoginPo} from '../support/pages/login.po';
import {getRandomString} from '../support/utils';

describe('Login with wrong creds', function () {
    const {loginForm, open} = new LoginPo();
    before(function () {
        cy.fixture('loginCreds').as('loginCreds');
    });
    it('should alert with wrong email', function () {
        open();
        loginForm(getRandomString(), '@loginCreds.email');
    });
});

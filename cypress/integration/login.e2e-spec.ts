import { LoginPo } from '../support/pages/login.po';
import { formatErrorMessage, formatFormError } from '../support/helper';
import { accountData, incorrectEmail, incorrectPassword } from '../support/models/account-data.mock';


describe('Login functionality', function () {

    const { email, password } = accountData;
    const loginPage = new LoginPo();

    beforeEach( function () {
        loginPage.open();
    });

    afterEach (function () {
        loginPage.urlIsOpened();
    });

    it('should error message appears and it equals to "Please enter a valid username or email address.', function () {
        loginPage.login(incorrectEmail, password);
        loginPage.getErrorMessage().should('contain', formatFormError());
    });

    it('should error message appears and it equals to "Incorrect username or password provided."', function () {
        loginPage.login(email, incorrectPassword);
        loginPage.getFormError().should('contain', formatErrorMessage());
    });
});

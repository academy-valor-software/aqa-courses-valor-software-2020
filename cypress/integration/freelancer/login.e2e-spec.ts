import {LoginPo} from '../../support/pages/freelancer/login.po';
import {accountData} from '../../support/models/account.data.mock';

describe('Validation for login', function () {
    const loginPage = new LoginPo();

    beforeEach(function () {
        loginPage.open();
    });

    it('should check inability to login with email with invalid format and correct password', function () {
        loginPage.login(accountData.username.replace('@', '$'), accountData.password);

        loginPage.isUrlOpened();
        loginPage.getFieldErrorMessageText().should('equal', loginPage.enterValidUsernameOrEmail);
    });

    it('should check inability to login with correct email and incorrect password', function () {
        loginPage.login(accountData.username, accountData.password.substring(1));

        loginPage.isUrlOpened();
        loginPage.getAlertErrorMessageText().should('equal', loginPage.invalidUsernameOrPassword);
    });
});

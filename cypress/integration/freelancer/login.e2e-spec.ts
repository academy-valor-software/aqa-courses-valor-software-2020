import {LoginPo} from '../../support/pages/freelancer/login.po';
import {enterValidUsernameOrEmail, invalidUsernameOrPassword} from '../../support/models/error.messages';
import {accountWrongUsername} from '../../support/models/account.wrong.username.mock';
import {accountWrongPassword} from '../../support/models/account.wrong.password.mock';

describe('Validation for login', function () {
    const loginPage = new LoginPo();

    beforeEach(function () {
        loginPage.open();
    });

    it('should check inability to login with email with invalid format and correct password', function () {
        loginPage.login(accountWrongUsername.username, accountWrongUsername.password);

        loginPage.isUrlOpened();
        loginPage.getFieldErrorMessageText().should('equal', enterValidUsernameOrEmail);
    });

    it('should check inability to login with correct email and incorrect password', function () {
        loginPage.login(accountWrongPassword.username, accountWrongPassword.password);

        loginPage.isUrlOpened();
        loginPage.getAlertErrorMessageText().should('equal', invalidUsernameOrPassword);
    });
});

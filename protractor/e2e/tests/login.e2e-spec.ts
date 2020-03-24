import { formatUserName, getEmailWithoutDomain } from '../helper/utils';
import { LoginPo } from '../pages/login.po';
import { DashboardPo } from '../pages/dashboard.po';
import { accountData } from '../data/account-data.mock';
import { enterValidUsernameOrEmail, invalidUsernameOrPassword } from '../data/error-messages-text';
import { LogoutPo } from '../pages/logout.po';

describe('Login functionality', () => {

    const { email, password, userId, firstName, lastName } = accountData;

    const logoutPage = new LogoutPo();
    const loginPage = new LoginPo();
    const dashboardPage = new DashboardPo();

    beforeEach(async () => {
        await logoutPage.open();
        await loginPage.open();
    });

    it('should check ability to login with CORRECT password and email', async () => {
        await loginPage.login(email, password);

        expect(await dashboardPage.isUrlOpened()).toBe(true);
        expect(await dashboardPage.getUserInitials()).toEqual(formatUserName(firstName, lastName));
        expect(await dashboardPage.getUserId()).toEqual('@' + userId);
    });

    it('should check inability to login with email with invalid format and correct password', async () => {
        await loginPage.login(getEmailWithoutDomain(email), password);

        expect(await loginPage.isUrlOpened()).toBe(true);
        expect(await loginPage.getFieldErrorMessageText()).toEqual(enterValidUsernameOrEmail);
    });

    it('should check inability to login with correct email and incorrect password', async () => {
        await loginPage.login(email, email);

        expect(await loginPage.isUrlOpened()).toBe(true);
        expect(await loginPage.getAlertErrorMessageText()).toEqual(invalidUsernameOrPassword);
    });
});

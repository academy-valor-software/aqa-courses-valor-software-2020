import { formatUserName } from '../helper/utils';
import { LoginPo } from '../pages/login.po';
import { DashboardPo } from '../pages/dashboard.po';
import { accountData } from '../data/account-data.mock';
import { $, browser } from 'protractor';
import { loginErrorMsg } from '../data/login-data.mock';

describe('Login functionality', () => {

    const { email, password, userId, firstName, lastName } = accountData;
    const { invalidEmailOrPassMsg, invalidEmailFormatMsg } = loginErrorMsg;
    const loginPage = new LoginPo();
    const dashboardPage = new DashboardPo();
    const { errorMsg } = loginPage;

    beforeEach(async () => {
        await browser.manage().deleteAllCookies();
        await loginPage.open();
    });

    afterEach(async () => {
        await browser.executeScript('window.sessionStorage.clear();');
        await browser.executeScript('window.localStorage.clear();');
        await browser.manage().deleteAllCookies();
    });

    it('should check ability to login with CORRECT password and email', async () => {
        await loginPage.login(email, password);

        expect(await dashboardPage.isUrlOpened()).toBe(true);
        expect(await dashboardPage.getUserInitials()).toEqual(formatUserName(firstName, lastName));
        expect(await dashboardPage.getUserId()).toEqual('@' + userId);
    });

    it('should fail because of the invalid email format' , async () => {
        await loginPage.login('email', password);
        expect(await loginPage.checkAlertMessage(errorMsg, invalidEmailFormatMsg));
    });


    it('should fail because of the invalid email/password' , async () => {
        await loginPage.login('artembashlak@', password);
        expect(await loginPage.checkAlertMessage(errorMsg, invalidEmailOrPassMsg));
    });
});


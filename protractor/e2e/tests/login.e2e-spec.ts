import { formatUserName } from '../helper/utils';
import { LoginPo } from '../pages/login.po';
import { DashboardPo } from '../pages/dashboard.po';
import { accountData } from '../data/account-data.mock';
import {$, browser, by, element, protractor} from 'protractor';

describe('Login functionality', () => {

    const { email, password, userId, firstName, lastName } = accountData;
    const loginPage = new LoginPo();
    const dashboardPage = new DashboardPo();
    const EC = protractor.ExpectedConditions;

    beforeEach(async () => {
        await browser.manage().deleteAllCookies();
        await browser.waitForAngularEnabled(true);
    });

    afterEach(async () => {
        await browser.waitForAngularEnabled(true);
        await browser.executeScript('window.sessionStorage.clear();');
        await browser.executeScript('window.localStorage.clear();');
        await browser.manage().deleteAllCookies();
    });

    it('should check ability to login with CORRECT password and email', async () => {
        await loginPage.open();
        await loginPage.login(email, password);

        expect(await dashboardPage.isUrlOpened()).toBe(true);
        expect(await dashboardPage.getUserInitials()).toEqual(formatUserName(firstName, lastName));
        expect(await dashboardPage.getUserId()).toEqual('@' + userId);
    });

    it('should fail because of the invalid email format' , async () => {
        const errorMessageSelector = element(by.xpath('//span[contains(text(),\'Incorrect username or password provided.\')]'));
        const expectedErrorMessage = 'Incorrect username or password provided.';

        await loginPage.open();
        await loginPage.login('email', password);

        expect(errorMessageSelector.getText()).toEqual(expectedErrorMessage);
        expect(await browser.getCurrentUrl()).toContain('login');
    });


    it('should fail because of the invalid email/password' , async () => {
        const errorMessageSelector = $('div.form-error');
        const expectedErrorMessage = 'Please enter a valid username or email address.';

        await loginPage.open();
        await loginPage.login('artembashlak@', password);
        await browser.wait(EC.visibilityOf(errorMessageSelector), 10000, 'Too long :(');

        expect(errorMessageSelector.getText()).toEqual(expectedErrorMessage);
        expect(await browser.getCurrentUrl()).toContain('login');
    });
});


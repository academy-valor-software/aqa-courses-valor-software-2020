import { browser } from 'protractor';

import { formatUserName } from '../helper/utils';
import { LoginPo } from '../pages/login.po';
import { DashboardPo } from '../pages/dashboard.po';
import { accountData } from '../data/account-data.mock';
import { DataProvider } from '../data/data-provider';

describe('Login functionality', () => {

  const { email, password, userId, firstName, lastName } = accountData;

  const loginPage = new LoginPo();
  const dashboardPage = new DashboardPo();

  beforeEach(async() => {
    await loginPage.open();
  });

  afterEach(async () => {
    await browser.manage().deleteAllCookies();
  });

  it('should check ability to login with CORRECT password and email', async () => {
    await loginPage.login(email, password);

    expect(await dashboardPage.isUrlOpened()).toBe(true);
    expect(await dashboardPage.getWelcomeText()).toEqual(DataProvider.dashboardPage.welcomeText);
    expect(await dashboardPage.getUserInitials()).toEqual(formatUserName(firstName, lastName));
    expect(await dashboardPage.getUserId()).toEqual('@' + userId);
  });

  it('should not be able to login with INCORRECT password', async () => {
    const errorMessage = 'Incorrect username or password provided.';
    await loginPage.login(email, 'incorrect_pass');

    expect(await loginPage.isUrlOpened()).toBe(true);
    expect(await loginPage.getPasswordErrorText()).toContain(errorMessage);
  });

  it('should not be able to login with INCORRECT email', async () => {
    const errorMessage = 'Please enter a valid username or email address.';
    await loginPage.login('incorrect_email', password);

    expect(await loginPage.isUrlOpened()).toBe(true);
    expect(await loginPage.getEmailErrorText()).toEqual(errorMessage);
  });
});

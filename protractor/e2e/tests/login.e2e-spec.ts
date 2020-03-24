
import { formatUserName, getRandomString } from '../helper/utils';
import { LoginPo } from '../pages/login.po';
import { DashboardPo } from '../pages/dashboard.po';
import { accountData } from '../data/account-data.mock';
import { loginData } from '../data/login-data.mock';
import {$} from 'protractor';

describe('Login functionality', () => {

  const { email, password, userId, firstName, lastName } = accountData;
  const { emailAlert, passAlert } = loginData;

  const loginPage = new LoginPo();
  const dashboardPage = new DashboardPo();
  const { alertBox } = loginPage;

  // it('should check ability to login with CORRECT password and email', async () => {
  //   await loginPage.open();
  //   await loginPage.login(email, password);
  //
  //   expect(await dashboardPage.isUrlOpened()).toBe(true);
  //   expect(await dashboardPage.getUserInitials()).toEqual(formatUserName(firstName, lastName));
  //   expect(await dashboardPage.getUserId()).toEqual('@' + userId);
  // });

  it('should alert invalid email', async () => {
    await loginPage.open();
    await loginPage.login(getRandomString(), password);

    expect(await loginPage.alertIsShown(alertBox));
    expect(await loginPage.checkAlertText(alertBox, emailAlert));
  });

  it('should alert invalid password', async () => {
    await loginPage.open();
    await loginPage.login(email, getRandomString());

    expect(await loginPage.isUrlOpened()).toBe(true);
    expect(await loginPage.alertIsShown(alertBox));
    expect(await loginPage.checkAlertText(alertBox, passAlert));
  });
});


import { formatUserName } from '../helper/utils';
import { formatErrorMessage } from '../helper/utils';
import { formatFormError } from '../helper/utils';
import { LoginPo } from '../pages/login.po';
import { DashboardPo } from '../pages/dashboard.po';
import { accountData, incorrectAccountData } from '../data/account-data.mock';

describe('Login functionality', () => {

  const { email, password, userId, firstName, lastName } = accountData;
  const { incorrectPassword, incorrectEmail } = incorrectAccountData;

  const loginPage = new LoginPo();
  const dashboardPage = new DashboardPo();

  it('should error message appears and it equals to "Please enter a valid username or email address."', async() => {
    await loginPage.open();
    await loginPage.login(incorrectEmail, password);

    expect(await loginPage.getFormError()).toEqual(formatFormError());
    expect(await loginPage.isUrlOpened()).toBe(true);
  });

  it('should error message appears and it equals to "Incorrect username or password provided."', async() => {
    await loginPage.open();
    await loginPage.login(email, incorrectPassword);

    expect(await loginPage.getErrorMessage()).toEqual(formatErrorMessage());
    expect(await loginPage.isUrlOpened()).toBe(true);
  });

  it('should check ability to login with CORRECT password and email', async () => {
    await loginPage.open();
    await loginPage.login(email, password);

    expect(await dashboardPage.isUrlOpened()).toBe(true);
    expect(await dashboardPage.getUserInitials()).toEqual(formatUserName(firstName, lastName));
    expect(await dashboardPage.getUserId()).toEqual('@' + userId);
  });

});

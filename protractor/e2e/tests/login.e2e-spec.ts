
import { formatUserName } from '../helper/utils';
import { LoginPo } from '../pages/login.po';
import { DashboardPo } from '../pages/dashboard.po';
import { accountData } from '../data/account-data.mock';

describe('Login functionality', () => {

  const { email, password, userId, firstName, lastName } = accountData;

  const loginPage = new LoginPo();
  const dashboardPage = new DashboardPo();

  it('should check ability to login with CORRECT password and email', async () => {
    await loginPage.open();
    await loginPage.login(email, password);

    expect(await dashboardPage.isUrlOpened()).toBe(true);
    expect(await dashboardPage.getUserInitials()).toEqual(formatUserName(firstName, lastName));
    expect(await dashboardPage.getUserId()).toEqual('@' + userId);
  });
});

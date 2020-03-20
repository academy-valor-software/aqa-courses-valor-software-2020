
import { formatUserName } from '../helper/utils';
import { LoginPo } from '../pages/login.po';
import { DashboardPo } from '../pages/dashboard.po';
import {accountData, invalidLoginEmail, invalidLoginPassword} from '../data/account-data.mock';
import {emailErrorMesText, passwordErrorMsgText} from '../data/error-message-data.mock';


describe('Login functionality', () => {

  const loginPage = new LoginPo();
  const dashboardPage = new DashboardPo();

    beforeEach(async () => {
      await loginPage.open();
    });

    xit('should check ability to login with CORRECT password and email', async () => {
      const {email, password, userId, firstName, lastName} = accountData;
      await loginPage.login(email, password);

      expect(await dashboardPage.isUrlOpened()).toBe(true);
      expect(await dashboardPage.getUserInitials()).toEqual(formatUserName(firstName, lastName));
      expect(await dashboardPage.getUserId()).toEqual('@' + userId);
    });

    it('should check invalid email format validation', async () => {
      const {email, password} = invalidLoginEmail;

      await loginPage.loginWithInvalidEmail(email, password);

      expect(await loginPage.getFormErrorMessage()).toEqual(emailErrorMesText);
      expect(await loginPage.isUrlOpened()).toBe(true);
    });
  it('should check incorrect password validation', async () => {
    const {email, password} = invalidLoginPassword;

    await loginPage.loginWithInvalidPassword(email, password);

    expect(await loginPage.getErrorMessageText()).toEqual(passwordErrorMsgText);
    expect(await loginPage.isUrlOpened()).toBe(true);
  });
});

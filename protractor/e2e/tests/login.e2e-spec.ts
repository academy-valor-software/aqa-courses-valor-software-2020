
import { formatUserName } from '../helper/utils';
import { LoginPo } from '../pages/login.po';
import { DashboardPo } from '../pages/dashboard.po';
import { accountData } from '../data/account-data.mock';


describe('Login functionality', () => {

  const {email, password, userId, firstName, lastName} = accountData;

  const loginPage = new LoginPo();
  const dashboardPage = new DashboardPo();


    it('should check ability to login with CORRECT password and email', async () => {
      await loginPage.open();
      await loginPage.login(email, password);

      expect(await dashboardPage.isUrlOpened()).toBe(true);
      expect(await dashboardPage.getUserInitials()).toEqual(formatUserName(firstName, lastName));
      expect(await dashboardPage.getUserId()).toEqual('@' + userId);
    });

    it('should check invalid email format validation', async () => {
      const invalidEmail = 'pionier.adler@';
      const errorMessageText = 'Please enter a valid username or email address.';

      await loginPage.open();
      await loginPage.loginWithInvalidEmail(invalidEmail, password);
      await loginPage.getFormErrorMessage();

      expect(await loginPage.getFormErrorMessage()).toEqual(errorMessageText);
      expect(await loginPage.isUrlOpened()).toBe(true);
    });
  it('should check incorrect password validation', async () => {
    const invalidPassword = 'abc123';
    const errorMessageText = 'Incorrect username or password provided.';

    await loginPage.open();
    await loginPage.loginWithInvalidPassword(email, invalidPassword);
    await loginPage.getErrorMessageText();

    expect(await loginPage.getErrorMessageText()).toEqual(errorMessageText);
    expect(await loginPage.isUrlOpened()).toBe(true);
  });
});

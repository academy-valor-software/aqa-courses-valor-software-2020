
import { formatUserName } from '../helper/utils';
import { LoginPo } from '../pages/login.po';
import { DashboardPo } from '../pages/dashboard.po';
import { accountData } from '../data/account-data.mock';

// describe('Login functionality', () => {
//
//     const { email, password, } = accountData;
//
//     const loginPage = new LoginPo();
//     const dashboardPage = new DashboardPo();
//
//     it('should check ability to login with CORRECT password and email', async () => {
//       await loginPage.open();
//       await loginPage.login(email, password);
//
//       expect(await dashboardPage.isUrlOpened()).toBe(true);
//       // expect(await dashboardPage.getUserInitials()).toEqual(formatUserName(firstName, lastName));
//       // expect(await dashboardPage.getUserId()).toEqual('@' + userId);
//     });
// })

describe(`Login functional negative cases`, () => {

    const {incorrectEmail, incorrectPassword , password, email } = accountData;


    const loginPage = new LoginPo();

    it(`should check incorrect email`, async () => {
        await loginPage.open();
        await loginPage.login(incorrectEmail, password);

        expect(await loginPage.checkErrorMessage()).toBe(true);
        expect(await loginPage.isUrlOpened()).toBe(true);
    });

    it(`should check invalid password`, async () => {
        await loginPage.open();
        await loginPage.login(email, incorrectPassword);

        expect(await loginPage.checkErrorMessage()).toBe(true);
        expect(await loginPage.isUrlOpened()).toBe(true);
    });

})

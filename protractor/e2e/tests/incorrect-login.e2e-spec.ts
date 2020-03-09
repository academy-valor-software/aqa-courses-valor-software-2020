import { formatUserName } from '../helper/utils';
import { LoginPo } from '../pages/login.po';
import { DashboardPo } from '../pages/dashboard.po';
import { accountData } from '../data/account-data.mock';
import {$, browser} from 'protractor';


describe('Incorrect login functionality', () => {

    const { email, password, wrongEmail, wrongPassword } = accountData;

    const loginPage = new LoginPo();
    beforeEach( async() => {
        await loginPage.open();
    });

    it ('should check ability to NOT login with INCORRECT password ', async() => {
        await loginPage.login( email, wrongPassword );

        expect(await loginPage.waitForVisible(loginPage.incorrectPasswordMessage));
        expect(browser.getCurrentUrl()).toContain("/login");
    });



    it ('should check ability to NOT login with INCORRECT email ', async() => {
        await loginPage.login( wrongEmail, password );


        expect(await loginPage.waitForVisible(loginPage.incorrectEmailMessage));
        expect(browser.getCurrentUrl()).toContain("/login");
    });


});

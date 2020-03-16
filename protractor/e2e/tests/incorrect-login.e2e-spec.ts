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

    it ('should check ability NOT to  login with INCORRECT password ', async() => {
        await loginPage.login( email, wrongPassword );

        expect(browser.getCurrentUrl()).toContain('/login');
        expect (loginPage.incorrectPasswordMessage.getText()).toContain('Incorrect username or password provided.');
    });

    it ('should check ability NOT to login with INCORRECT email ', async() => {
        await loginPage.login( wrongEmail, password );

        expect(browser.getCurrentUrl()).toContain('/login');
        expect (loginPage.incorrectEmailMessage.getText()).toContain('Please enter a valid username or email address');
    });

});

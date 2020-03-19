import {browser} from 'protractor';
import {loginByApi} from '../helper/login-helper';

describe('Login Through api', () => {
    beforeAll(async () => {
        await loginByApi();
        await browser.refresh();
    });

    it('Should be logged', async () => {
        expect(await browser.getCurrentUrl()).toContain('dashboard');
    });
});

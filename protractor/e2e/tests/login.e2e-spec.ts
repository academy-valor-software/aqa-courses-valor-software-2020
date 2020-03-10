import {browser, by, element, $} from 'protractor';
import {LoginPo} from '../pages/login.po';

describe('login functionality', () => {
    it('should check login with email and password', async () => {
        const loginPo = new LoginPo();

        // await element(by.css('locator'))
        await LoginPo.setUser()

        await $('#login_btn').click();

        expect(await browser.getCurrentUrl().toContain('/dashboard'));
        expect(await $('fl-heading.Username-displayName').getText().toEqual('Oksana K.'));
        expect(await $('fl-heading.Username-userId').getText().toEqual('@oksanakhalilova'));
    });
});




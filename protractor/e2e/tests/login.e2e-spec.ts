import {browser, $} from 'protractor';

describe('#Login functionality', function () {
    const username = '#username';
    const password = '#password';

    it('=> Login with correct email and password' , async () => {
        await browser.get('/login?w=f&ngsw-bypass=');
        await $(username).clear();
        await $(username).sendKeys('artembashlak@gmail.com');
        await $(password).clear();
        await $(password).sendKeys('fuck123.');
        await $('#login_btn').click();

        expect(await browser.getCurrentUrl()).toContain('dashboard');
        expect(await $('fl-heading.Username-displayName').getText()).toContain('Artem');
        expect(await $('fl-heading.Username-userId').getText()).toEqual('@abashlak');
    });
});


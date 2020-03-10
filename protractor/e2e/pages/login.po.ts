import {browser, by, element, $} from 'protractor';

export class LoginPo extends BaseComponent {
    readonly  url = '/login';

    private readonly inputEmail = $('#username');
    private readonly inputPassword = $('#password');
    private readonly clickLogin = $('#login_btn');

    async open(): Promise<void> {
        await browser.get(this.url);
    }

    async setUser(username: string): Promise<void> {
        await $('#username').clear();
        await $('#username').sendKey('oksanakhalilova@gmail.com');
    }

    async setPassword(password: string): Promise<void> {
        await $('#password').clear();
        await $('#password').sendKey('1992fkbr');
    }
}

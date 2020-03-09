import { $ } from 'protractor';
import { BaseComponent } from './base.component';

export class LoginPo extends BaseComponent {
    readonly url = '/login';

    private readonly inputUserName = $('#username');
    private readonly inputPassword = $('#password');
    private readonly btnLogin = $('#login_btn');
    private readonly alertErrorMessageText = $('.alert-error [ng-if*=error]');
    private readonly fieldErrorMessageText = $('.form-error');

    async login(email: string, password: string): Promise<void> {
        await this.waitForClickable(this.inputUserName);
        await this.clearAndSetInputValue(this.inputUserName, email);
        await this.clearAndSetInputValue(this.inputPassword, password);
        await this.btnLogin.click();
    }

    async getAlertErrorMessageText(): Promise<string> {
        return (await this.alertErrorMessageText.getText());
    }

    async getFieldErrorMessageText(): Promise<string> {
        return (await this.fieldErrorMessageText.getText());
    }
}

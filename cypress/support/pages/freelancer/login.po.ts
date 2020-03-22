/// <reference types="cypress" />

import {BaseComponent} from './base.component';

export class LoginPo extends BaseComponent {
    readonly url = '/login?w=f&ngsw-bypass=';

    readonly enterValidUsernameOrEmail = 'Please enter a valid username or email address.';
    readonly invalidUsernameOrPassword = 'Incorrect username or password provided.';

    private readonly inputUserName = '#username';
    private readonly inputPassword = '#password';
    private readonly btnLogin = '#login_btn';
    private readonly alertErrorMessageText = '.alert-error span';
    private readonly fieldErrorMessageText = '.form-error';

    login(email: string, password: string) {
        super.clearAndSetInputValue(this.inputUserName, email);
        super.clearAndSetInputValue(this.inputPassword, password);
        cy.get(this.btnLogin).click();
    }

    getAlertErrorMessageText() {
        return super.getErrorMessageText(this.alertErrorMessageText);
    }

    getFieldErrorMessageText() {
        return super.getErrorMessageText(this.fieldErrorMessageText);
    }
}

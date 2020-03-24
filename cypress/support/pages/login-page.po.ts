/// <reference types="cypress" />

export class LoginPagePo {
    readonly url = '/login?w=f&ngsw-bypass=';
    private readonly loginField = '#username';
    private readonly passwordField = '#password';
    private readonly loginBtn = '#login_btn';
    private readonly emailErrorMsg = '.form-error';
    private readonly passwordErrorMsg = '.alert.alert-error span';

    openLoginPage() {
        cy.visit(this.url);
    }

    enterUsername(email: string) {
        cy.get(this.loginField).type(email);
    }

    enterPassword(password: string) {
        cy.get(this.passwordField).type(password);
    }

    clickLoginBtn() {
        cy.get(this.loginBtn).click();
    }

    login(email: string, password: string) {
        this.enterUsername(email);
        this.enterPassword(password);
        this.clickLoginBtn();
    }

    getEmailErrorMsg() {
        return cy.get(this.emailErrorMsg);
    }

    getPasswordErrorMsg() {
        return cy.get(this.passwordErrorMsg);
    }
}

/// <reference types="cypress" />

export class LoginPo {
    private readonly url = '/login?w=f&ngsw-bypass=';
    private readonly inputUserName = '#username';
    private readonly form = '[name*="LoginForm.form"]';
    private readonly inputPassword = '#password';
    private readonly loginBtn = '#login_btn';
    private readonly alertBox = '.alert-error';
    private readonly formError = '.form-error';

    open() {
        cy.visit(this.url);
    }
    private clearFields() {
        cy.get(this.inputUserName).clear();
        cy.get(this.inputPassword).clear();
    }
    loginForm(email: string, password: string) {
        this.clearFields();
        cy.get(this.form).should('be.visible').within(() => {
            cy.get(this.inputUserName).type(email)
                .get(this.inputPassword).type(password)
                .get(this.loginBtn).click();
        });
    }
    getErrorMessage() {
        return cy.get(this.formError).should('be.visible').then($box => $box.text().trim());
    }
    getAlertMessage() {
        return cy.get(this.alertBox).should('be.visible').then($box => $box.text().trim());
    }
}

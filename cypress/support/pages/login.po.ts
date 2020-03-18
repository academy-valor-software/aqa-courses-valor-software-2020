/// <reference types="cypress" />

export class LoginPo {
    private readonly url = '/login';
    private readonly inputUserName = '#username';
    private readonly form = '.LoginForm';
    private readonly inputPassword = '#password';
    private readonly alertBox = 'aside';

    open() {
        cy.visit(this.url);
    }
    private clearFields() {
        cy.get(this.inputUserName).clear();
        cy.get(this.inputPassword).clear();
    }
    loginForm(email: string, password: string) {
        this.clearFields();
        cy.get(this.form).within(() => {
            cy.get(this.inputUserName).type(email);
            cy.get(this.inputPassword).type(password);
            cy.root().submit();
        });
    }
    getErrorMessage() {
        cy.get(this.alertBox).should('be.visible').then(() => {

        });
    }
}

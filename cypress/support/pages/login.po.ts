/// <reference types="Cypress" />

export class LoginPage {
    private readonly url = 'login?w=f&ngsw-bypass=';
    public readonly inputUserName = '#username';
    public readonly inputPassword = '#password';
    private readonly btnLogin = '#login_btn';
    public readonly formErrorMsg = '.form-error';
    public readonly alertErrorMsg = 'aside';

    open() {
        cy.visit(this.url);
    }

    fillUserInput(username: string) {
        cy.get(this.inputUserName)
            .type(username)
            .should('have.value', username);
    }

    fillUserPassword(password: string) {
        cy.get(this.inputPassword)
            .type(password)
            .should('have.value', password);
    }

    clickLoginBtn() {
        cy.get(this.btnLogin).click();
    }

    fillForm(username: string, password: string) {
        this.fillUserInput(username);
        this.fillUserPassword(password);
        this.clickLoginBtn();
    }
}

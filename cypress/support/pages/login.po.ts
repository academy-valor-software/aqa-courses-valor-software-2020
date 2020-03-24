/// <reference types="cypress" />

import { BaseComponent } from './base.components';

export class LoginPo  {
    readonly url = '/login?w=f&ngsw-bypass=';

    BasePo = new BaseComponent();

    private readonly inputUserName = '#username';
    private readonly inputPassword = '#password';
    private readonly btnLogin = '#login_btn';
    private readonly errorMessage = '.alert-error span';
    private readonly formError = '.form-error';

    open() {
        cy.visit(this.url);
    }

    urlIsOpened() {
        cy.url().should('contain', this.url);
    }

    login(email: string, password: string) {
        this.BasePo.clearAndSetInputValue(this.inputUserName, email);
        this.BasePo.clearAndSetInputValue(this.inputPassword, password);
        cy.get(this.btnLogin).click();
    }

    getErrorMessage() {
        return cy.get(this.formError);
    }

    getFormError() {
        return cy.get(this.errorMessage);
    }
}


/// <reference types="cypress" />

import { removeNonNumeric } from '../helper';
import {IFamily} from '../models/family.model';

export class BaseComponent {
    readonly url: string = '/';
    data: IFamily = {income: '', country: '', name: ''};

    open() {
        cy.visit(this.url);
    }

    waitRoute(url: string, aliasName: string) {
        cy.server();
        cy.route('GET', url).as(aliasName);
    }

    getIncome(locator: string) {
       return cy.get(locator).then($el => removeNonNumeric($el.text()));
    }
}

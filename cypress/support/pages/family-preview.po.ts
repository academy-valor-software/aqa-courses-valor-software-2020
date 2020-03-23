/// <reference types="cypress" />

import { FamilyInfoPage } from './family.component.po';

export class FamilyPreview extends FamilyInfoPage {
    private readonly income = '.view-image-block-container .header-container';
    private readonly nameAndCountry = '.description-title:not(div)';
    private readonly visitHomeBtn = '.description-actions [href*=\'family?place\']';

    getFamilyInfo() {
        return super.getFamilyInformation(this.nameAndCountry, this.income);
    }

    clickVisitHome() {
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/v1/home-header?**'
        }).as('getHomeHeader');
        cy.get(this.visitHomeBtn).click().wait('@getHomeHeader');
    }
}

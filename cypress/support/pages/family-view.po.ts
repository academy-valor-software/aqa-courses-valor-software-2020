/// <reference types="cypress" />

import {FamilyInfoPage} from './family-information.component.po';

export class FamilyViewPage extends FamilyInfoPage {
    private readonly income = '.view-image-block-container .header-container';
    private readonly nameAndCountry = '.description-title:not(div)';
    private readonly visitHomeButton = '.description-actions [href*=\'family?place\']';

    getFamilyInformation() {
        return super.getFamilyInformation(this.nameAndCountry, this.income);
    }

    clickVisitHome() {
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/v1/home-header?**'
        }).as('getHomeHeader');
        cy.get(this.visitHomeButton).click().wait('@getHomeHeader');
    }
}

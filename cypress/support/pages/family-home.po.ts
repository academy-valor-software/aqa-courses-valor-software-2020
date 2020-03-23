/// <reference types="cypress" />

import { FamilyModel } from '../models/family.model';
import { FamilyInfoPage } from './family.component.po';

export class FamilyHome extends FamilyInfoPage {
    private readonly name = '.home-description-container .desktop';
    private readonly income = '.home-info-container .right-title .title';
    private readonly country = '.home-country-container .title';
    private readonly nameAndCountrySticky = '.short-family-info-container .desktop';
    private readonly incomeSticky = '.short-family-info-container .right-title .title';

    getFamilyInfo() {
        const family: FamilyModel = {name: '', income: '', country: ''};
        cy.get(this.name).then(nameElement => nameElement.text().trim())
            .then(fullNameText => family.name = fullNameText.substring(0, fullNameText.indexOf(' '))
                .replace('\n', ''))
            .get(this.income).then(incomeElement => family.income = incomeElement.text().replace(/\D/g, ''))
            .get(this.country).then(countryElement => family.country = countryElement.text());

        return cy.wrap(family);
    }

    getInfoInSticky(px: number) {
        cy.scrollTo(0, px);
        return super.getFamilyInformation(this.nameAndCountrySticky, this.incomeSticky);
   }
}

/// <reference types="cypress" />

import {FamilyInfoPage} from './family-information.component.po';
import {IFamily} from '../models/family.model';

export class FamilyHomePage extends FamilyInfoPage {
    private readonly name = '.home-description-container .desktop';
    private readonly income = '.home-info-container .right-title .title';
    private readonly country = '.home-country-container .title';
    private readonly nameAndCountrySticky = '.short-family-info-container .desktop';
    private readonly incomeSticky = '.short-family-info-container .right-title .title';

    getFamilyInformation() {
        const family: IFamily = {name: '', income: '', country: ''};
        cy.get(this.name).then(nameElement => nameElement.text().trim())
            .then(fullNameText => family.name = fullNameText.substring(0, fullNameText.indexOf(' '))
                .replace('\n', ''))
            .get(this.income).then(incomeElement => family.income = incomeElement.text().replace(/\D/g, ''))
            .get(this.country).then(countryElement => family.country = countryElement.text());

        return cy.wrap(family);
    }

    scrollDown(pixels: number) {
        cy.scrollTo(0, pixels);
    }

    getFamilyInformationAfterScroll() {
        return super.getFamilyInformation(this.nameAndCountrySticky, this.incomeSticky);
    }
}

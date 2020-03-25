/// <reference types="cypress" />

import {FamilyData} from '../models/family-data.model';

export class FamilyViewPo {
    private readonly familyNameTitle = '.home-info-container .left-title .title.desktop';
    private readonly familyIncomeTitle = '.home-info-container .right-title .title';
    private readonly familyCountryTitle = '.home-country-container .title';
    private readonly familyNameAndCountryHeader = '.short-family-info-container .title.desktop';
    private readonly familyIncomeHeader = '.short-family-info-container .right-title .title';

    getFamilyTitleData() {
        const familyInfo: FamilyData = {name: '', country: '', income: ''};
        cy.get(this.familyNameTitle).then($el => familyInfo.name = $el.text().replace('family', '').trim())
            .get(this.familyCountryTitle).then($el => familyInfo.country = $el.text().trim())
            .get(this.familyIncomeTitle).then($el => familyInfo.income = $el.text().replace('/month', '').replace('$', '').trim());

        return cy.wrap(familyInfo);
    }

    scrollDown() {
        cy.scrollTo(0, 500);
    }

    getFamilyHeaderData() {
        const familyInfo: FamilyData = {name: '', country: '', income: ''};
        cy.get(this.familyNameAndCountryHeader)
            .then($el => familyInfo.name = $el.text().trim().split(' ', 1).toString().replace('\n', ''))
            .get(this.familyNameAndCountryHeader).then($el => familyInfo.country = $el.text()
            .replace(`${familyInfo.name}`, '').replace('family', '').replace(',', '').trim())
            .get(this.familyIncomeHeader).then($el => familyInfo.income = $el.text().replace('/month', '').replace('$', '').trim());

             return cy.wrap(familyInfo);
    }
}

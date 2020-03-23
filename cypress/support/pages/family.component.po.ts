/// <reference types="cypress" />

import { FamilyModel } from '../models/family.model';

export class FamilyInfoPage {

    getFamilyInformation(nameAndCountry: string, income: string) {
        const family: FamilyModel = {name: '', income: '', country: ''};
        cy.get(nameAndCountry)
            .then(nameAndCountryElement => nameAndCountryElement.text().trim())
            .then(nameAndCountryText => {
                family.name = nameAndCountryText.substring(0, nameAndCountryText.indexOf(' '))
                    .replace('\n', '');
                family.country = nameAndCountryText.substring(nameAndCountryText.lastIndexOf(' ') + 1);
            })
            .get(income).then(incomeElement => family.income = incomeElement.text().replace(/\D/g, ''));

        return cy.wrap(family);
    }
}

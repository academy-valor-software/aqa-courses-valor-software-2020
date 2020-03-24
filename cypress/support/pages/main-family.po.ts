/// <reference types="cypress" />

export class MainFamilyPo {
    readonly url = '/family';
    private readonly loader = 'loader';
    readonly nameTwoFamily = '.title-info .left-title .desktop';
    readonly countryTwoFamily = '.right-title:nth-child(1) .title';
    readonly incomeTwoFamily = '.title-info .right-title:nth-child(2) .title';
    readonly familyContainer = '.short-family-info-container .description-container';
    readonly familyDescription = '.short-family-info-container .left-title .desktop';
    readonly familyIncomeDescription = '.short-family-info-container .right-title';

    urlIsOpened() {
        cy.url().should('contain', this.url);
    }

    getInfoTwoFamily() {
        const familyTwo = {name: '', income: '', country: ''};
        cy.get(this.loader).should('have.attr', 'hidden');
        cy.get(this.nameTwoFamily).should('be.visible')
            .then(el => familyTwo.name = el.text().replace(' family', '').trim());
        cy.get(this.incomeTwoFamily).should('be.visible')
            .then(el => familyTwo.income = el.text().replace('$', '').replace('/month', '').trim());
        cy.get(this.countryTwoFamily).should('be.visible')
            .then(el => familyTwo.country = el.text().trim());
        return cy.wrap(familyTwo).as('familyTwo');
    }

    scrollToMenu() {
        cy.get(this.familyContainer).scrollIntoView({offset: {top: 50, left: 0}}).should('be.visible');
    }

    getInfoThreeFamily() {
        const familyThree = {name: '', income: '', country: ''};
        cy.get(this.familyDescription).should('be.visible')
            .then(el => familyThree.name = el.text().replace(/\s*family\s*.\s\w*/, '').trim());
        cy.get(this.familyIncomeDescription).should('be.visible')
            .then(el => familyThree.income = el.text().replace('$', '').replace('/month', '').trim());
        cy.get(this.familyDescription).should('be.visible')
            .then(el => familyThree.country = el.text().replace(/\w*\s*family\s*.\s/, '').trim());
        return cy.wrap(familyThree).as('familyThree');
    }
}

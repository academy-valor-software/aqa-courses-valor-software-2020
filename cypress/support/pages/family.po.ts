import {BaseComponent} from './base.component';

export class FamilyPo extends BaseComponent {
    readonly url: string = '/family';
    private readonly nameLocator = '.home-info-container .left-title .title';
    private readonly incomeLocator = '.home-info-container .right-title .title';
    private readonly countryLocator = '.home-country-container .right-title .title';
    private readonly headerFamilyLocator = '.left-title .title';
    private readonly headerIncomeLocator = '.right-title .title';
    private readonly header = '.short-family-info-container';
    private readonly familyContainer = '.home-description-container';

    getFamilyData() {
        cy.get(this.familyContainer)
            .within(() => {
                this.getIncome(this.incomeLocator).then(text => this.data.income = text);
                cy.get(this.countryLocator)
                    .then($el => this.data.country = $el.text().trim())
                    .get(this.nameLocator).first()
                    .then($el => this.data.name = $el.text().replace('family', '').trim());
        });

        return cy.wrap(this.data).as('familyData');
    }

    getFamilyDataFromHeader() {
        cy.get(this.header)
            .within(($container) => {
                cy.wrap($container).should('be.visible');
                this.getIncome(this.headerIncomeLocator).then(text => this.data.income = text);
                cy.get(this.headerFamilyLocator)
                    .last()
                    .then($el => {
                        const separatorInd = $el.text().indexOf(',');
                        this.data.country = $el.text().substring(separatorInd + 1).trim();
                        this.data.name = $el.text().substring(0, separatorInd).trim();
            });
        });

        return cy.wrap(this.data).as('familyDataFromHeader');
    }
}

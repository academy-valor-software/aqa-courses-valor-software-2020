import {BaseComponent} from './base.component';
import {getRandom, removeNonNumeric} from '../helper';

export class MatrixPo extends BaseComponent {
    readonly url: string = '/matrix';
    private readonly familyElements = '.image-content';
    private readonly matrixViewBlock = 'matrix-view-block';
    private readonly incomeLocator = '.header-container';
    private readonly descriptionLocator = '.description-title span';
    private readonly visitHomeButton = '[data-e2e="visit-this-home"]';

    private clickRandomFamily() {
        this.familiesCount().then(count => {
            this.waitRoute('**/v1/matrix-view-block/?**', 'families');
            cy.get(this.familyElements)
                .eq(getRandom(count - 1))
                .click()
                .wait('@families');
        });
    }

    private familiesCount() {
        return cy.get(this.familyElements).its('length');
    }

    getRandomFamilyData() {
        this.clickRandomFamily();

        cy.get(this.matrixViewBlock).within(() => {
            cy.get(this.incomeLocator)
                .first()
                .then($el => this.data.income = removeNonNumeric($el.text()))
                .get(this.descriptionLocator)
                .then($el => {
                    cy.wrap($el).last().then($innerEl => this.data.country = $innerEl.text().trim());
                    cy.wrap($el).first().then($innerEl => this.data.name = $innerEl.text()
                        .replace('family,', '').trim());
            });
        });

        return cy.wrap(this.data).as('matrixData');
    }

    visitFamilyHome() {
        this.waitRoute('**/v1/home-header?**', 'home');
        cy.get(this.visitHomeButton).click().wait('@home');
    }
}

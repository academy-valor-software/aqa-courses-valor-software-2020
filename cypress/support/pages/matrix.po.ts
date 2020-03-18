/// <reference types="cypress" />

export class MatrixPage {
    private readonly url = '/matrix';
    private readonly loader = 'loader';
    private readonly btnMinus = '.btn-minus';
    private readonly btnPlus = '.btn-plus';
    private readonly mainContainer = '.flex-container';
    private readonly imageFamily = '.image-content';
    private readonly loaderOfImg = '.loader-content';
    private readonly spanIncome = '.place-image-box-income';
    private readonly defaultAmountPerRow = 4;


    openPage() {
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/v1/things?**'
        }).as('getThingsRoute');
        cy.visit(this.url, {timeout: 10000})
            .get(this.loader).should('have.attr', 'hidden').wait('@getThingsRoute');
    }

    getFamiliesIncomes() {
        const incomes: number[] = [];
        cy.get(this.imageFamily).each(el => {
            cy.wrap(el).within(() => {
                cy.get(this.loaderOfImg).should('not.exist')
                    .get(this.spanIncome).should('be.visible')
                    .then(incomeEl => incomes.push(Number(incomeEl.text().replace(/\D/g, ''))));
            });
        });

        return cy.wrap(incomes);
    }

    getIncomeChunks(chunkLength: number = this.defaultAmountPerRow) {
        return this.getFamiliesIncomes().then(incomes => Cypress._.chunk(incomes, chunkLength));
    }

    setMatrixScale(expScale: number = this.defaultAmountPerRow) {
        const iterations: number[] = [];
        return this.getCurrentScale().then(currentScale => {
            const totalIterations = expScale - currentScale;
            iterations.push(...Cypress._.range(currentScale, expScale));

            cy.wrap(iterations).each((scale: number) => {
                if (totalIterations > 0) {
                    this.clickBtnZoom(this.btnMinus, scale + 1);
                }
                if (totalIterations < 0) {
                    this.clickBtnZoom(this.btnPlus, scale - 1);
                }
            }).get(this.mainContainer).should('have.class', `column-${expScale}`);
        });
    }

    private getCurrentScale() {
        return cy.location().then(({search}) => {
            return search.includes('zoom') ? Number(search.replace('?zoom=', '')) : this.defaultAmountPerRow;
        });
    }

    private clickBtnZoom(selector: string, scale: number) {
        cy.get(selector).click().location('search').should('eq', `?zoom=${scale}`);
    }
}

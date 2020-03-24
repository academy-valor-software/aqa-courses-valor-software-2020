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
    private readonly nameFamily = '.description-title h3 > span:first-child';
    private readonly countryFamily = '.description-title h3 > span:last-child';
    private readonly incomeFamily = '.house-info-content .header-container';
    private readonly btnVisit = '.description-actions .description-button[data-e2e ="visit-this-home"]';

    openPage() {
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/v1/things?**'
        }).as('getThingsRoute');
        cy.visit(this.url, {timeout: 30000})
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

    clickONFamily(index: number) {
        cy.get(this.imageFamily).eq(index).click();
    }

    getInfoFamily() {
        const family = {name: '', income: '', country: ''};
        cy.get(this.nameFamily).should('be.visible')
            .then(el => family.name = el.text().replace(' family,', '').trim());
        cy.get(this.incomeFamily).should('be.visible')
            .then(el => family.income = el.text().replace('$ ', '').replace('/month', '').trim());
        cy.get(this.countryFamily).should('be.visible')
            .then(el => family.country = el.text().trim());
        return cy.wrap(family).as('family');
    }

    goVisit() {
        cy.get(this.btnVisit).should('be.visible').click();
    }
}

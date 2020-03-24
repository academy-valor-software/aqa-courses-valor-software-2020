import { MatrixPage } from '../support/pages/matrix.po';
import { MainFamilyPo } from '../support/pages/main-family.po';

describe('Matrix functionality', function () {
    const page = new MatrixPage();
    const mainFamilyPage = new MainFamilyPo();
    const index = 1;

    beforeEach(function () {
        page.openPage();
    });

    it('should show families in asc order per row', function () {
        const amountPerRow = 2;
        page.setMatrixScale(amountPerRow);
        page.getIncomeChunks(amountPerRow).then(incomesChunk => {
            cy.sortChunkedArr(incomesChunk).should('deep.equal', incomesChunk);
        });
    });

    it('should name, income and country values match the values from the previous page.', function () {
        page.clickONFamily(index);
        page.getInfoFamily().as('info1');
        page.goVisit();
        mainFamilyPage.urlIsOpened();
        mainFamilyPage.getInfoTwoFamily().as('info2');
        mainFamilyPage.scrollToMenu();
        mainFamilyPage.getInfoThreeFamily().as('info3');
        cy.get('@info2').then(info2 => {
            cy.get('@info1').should('deep.equal', info2);
            cy.get('@info3').should('deep.equal', info2);
        });
    });
});

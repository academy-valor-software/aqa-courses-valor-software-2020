import {MatrixPage} from '../support/pages/matrix.po';
import {FamilyViewPage} from '../support/pages/family-view.po';
import {FamilyHomePage} from '../support/pages/family-home.po';

describe('Matrix functionality', function () {

    const matrixPage = new MatrixPage();
    const familyViewPage = new FamilyViewPage();
    const familyHomePage = new FamilyHomePage();

    beforeEach(function () {
        matrixPage.openPage();
    });

    it('should show families in asc order per row', function () {
        const amountPerRow = 2;
        matrixPage.setMatrixScale(amountPerRow);
        matrixPage.getIncomeChunks(amountPerRow).then(incomesChunk => {
            cy.sortChunkedArr(incomesChunk).should('deep.equal', incomesChunk);
        });
    });

    it('should display the same information about the definite family on different pages', function () {
        matrixPage.clickOnRandomFamily();
        familyViewPage.getFamilyInformation().then(viewFamilyInfo => {
            familyViewPage.clickVisitHome();
            familyHomePage.getFamilyInformation().then(familyHomeInfo => {
                cy.wrap(viewFamilyInfo.name).should('eq', familyHomeInfo.name);
                cy.wrap(viewFamilyInfo.income).should('eq', familyHomeInfo.income);
                cy.wrap(viewFamilyInfo.country).should('eq', familyHomeInfo.country);
            });

            familyHomePage.scrollDown(200);
            familyHomePage.getFamilyInformationAfterScroll().then(familyStickyHeaderInfo => {
                cy.wrap(viewFamilyInfo.name).should('eq', familyStickyHeaderInfo.name);
                cy.wrap(viewFamilyInfo.income).should('eq', familyStickyHeaderInfo.income);
                cy.wrap(viewFamilyInfo.country).should('eq', familyStickyHeaderInfo.country);
            });
        });
    });
});

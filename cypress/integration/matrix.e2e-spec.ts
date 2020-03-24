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
                cy.wrap(viewFamilyInfo).should('deep.equal', familyHomeInfo);
            });

            familyHomePage.scrollDown(200);
            familyHomePage.getFamilyInformationAfterScroll().then(familyStickyHeaderInfo => {
                cy.wrap(viewFamilyInfo).should('deep.equal', familyStickyHeaderInfo);
            });
        });
    });
});

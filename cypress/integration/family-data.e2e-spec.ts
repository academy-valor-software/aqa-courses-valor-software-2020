import {MatrixPage} from '../support/pages/matrix.po';
import {FamilyViewPo} from '../support/pages/family-view.po';

describe('matrix family data', function () {
    const matrixPage = new MatrixPage();
    const familyPage = new FamilyViewPo();

    it('should check family data', function () {
        matrixPage.openPage();
        matrixPage.clickRandomFamilyCard();
        matrixPage.getFamilyData().then(familyInfo => {

        matrixPage.clickVisitHome();

        familyPage.getFamilyTitleData().should('deep.equal', familyInfo );

        familyPage.scrollDown();

        familyPage.getFamilyHeaderData().should('deep.equal', familyInfo);
        });
    });
});

import { MatrixPage } from '../support/pages/matrix.po';
import {MainFamilyPo} from '../support/pages/main-family.po';

describe('Matrix functionality', function () {

    const page = new MatrixPage();
    const mainFamilyPage = new MainFamilyPo();
    const index = 1;

    beforeEach(function () {
        page.openPage();
    });

    xit('should show families in asc order per row', function () {
        const amountPerRow = 2;
        page.setMatrixScale(amountPerRow);
        page.getIncomeChunks(amountPerRow).then(incomesChunk => {
            cy.sortChunkedArr(incomesChunk).should('deep.equal', incomesChunk);
        });
    });

    it('should name, income and country values match the values from the previous page.', async() => {
        page.clickONFamily(index);
        const family = page.getInfoFamily();

        family.then(familyInfo => {
            page.goVisit();
            mainFamilyPage.urlIsOpened();
            const familyTwo = mainFamilyPage.getInfoTwoFamily();
            familyTwo.then(second => {
               expect(familyInfo).to.deep.equal(second);
            });

            familyTwo.then(second => {
                mainFamilyPage.scrollToMenu();
                const familyThree = mainFamilyPage.getInfoThreeFamily();
                familyThree.then(third => {
                    expect(second).to.deep.equal(third);
                });
            });
        });


/*
        await mainFamilyPage.mainScroll();

        const familyInfoThree = await familyDescriptionPage.getFamilyInfoThree();

        expect(familyInfoTwo.name).toEqual(familyInfoThree.name);
        expect(familyInfoTwo.income).toEqual(familyInfoThree.income);
        expect(familyInfoTwo.country).toEqual(familyInfoThree.country);
*/

    });
});

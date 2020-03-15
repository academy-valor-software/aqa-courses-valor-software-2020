import {MatrixPo} from '../../pages/ds/matrix.po';
import {StreetComponentPo, Toggle} from '../../pages/ds/street-component.po';
import {ElementArrayFinder, ElementFinder} from 'protractor';
import {FamilyPo} from '../../pages/ds/family-component.po';
import {FamilyViewPo} from '../../pages/ds/family-view.po';
import {FamilyHomePo} from '../../pages/ds/family-home.po';

describe('Displaying of families by income', () => {
    const matrixPage = new MatrixPo();
    const streetComponent = new StreetComponentPo();
    const familyView = new FamilyViewPo();
    const familyHome = new FamilyHomePo();

    beforeEach(async () => {
        await matrixPage.open();
    });

    it('should filter families on the page', async () => {
        const minValue = await streetComponent.moveToddler(Toggle.LEFT, 300);
        const maxValue = await streetComponent.moveToddler(Toggle.RIGHT, -300);

        const arrOfAllFamilies: ElementArrayFinder = matrixPage.allFamilies;

        const arrOfFamiliesIncomeValues =
            await arrOfAllFamilies.map((family: ElementFinder, index: number) => new FamilyPo(index).getIncomeValue());

        const arrOfIncomesOutOfRange = arrOfFamiliesIncomeValues.filter(value => (value >= maxValue || value <= minValue));

        expect(arrOfIncomesOutOfRange.length).toBe(0, `from ${minValue}
         ${arrOfIncomesOutOfRange.join(' ')} to ${maxValue}`);
    });

    it('should display the same information about the definite family on different pages', async () => {
        await matrixPage.clickOnRandomFamily();
        const infoFromViewFamily = await familyView.getFamilyInformation();
        await familyView.clickVisitHome();
        const infoFromFamilyHome = await familyHome.getFamilyInformation();
        await familyHome.scrollDown(200);
        const infoInStickyHeaderOfFamilyHome = await familyHome.getFamilyInformationAfterScroll();

        expect(infoFromViewFamily).toEqual(infoFromFamilyHome);
        expect(infoFromViewFamily).toEqual(infoInStickyHeaderOfFamilyHome);
    });
});

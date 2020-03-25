import { MatrixPo } from '../../pages/ds/matrix.po';
import { StreetComponentPo, Toggle } from '../../pages/ds/street-component.po';
import {ElementArrayFinder, ElementFinder} from 'protractor';
import { FamilyPo } from '../../pages/ds/family-component.po';
import {FamilyDetailsPO} from '../../pages/ds/family-details.po';
import {FamilyHeaderPO} from '../../pages/ds/family-header.po';



describe('Street component',  () => {
    const matrixPage = new MatrixPo();
    const streetComponent = new StreetComponentPo();

    const familyDetails = new FamilyDetailsPO();
    const familyHeader = new FamilyHeaderPO();


    beforeEach(async () => {
        await matrixPage.open();
    });

    xit('should filter families on the page', async () => {
        const minValue = await streetComponent.moveToddler(Toggle.LEFT, 300);
        const maxValue = await streetComponent.moveToddler(Toggle.RIGHT, -300);

        const arrOfAllFamilies: ElementArrayFinder = matrixPage.allFamilies;

        const arrOfFamiliesIncomeValues =
            await arrOfAllFamilies.map((family: ElementFinder, index: number) => new FamilyPo(index).getIncomeValue());

        const arrOfIncorrectIncomeValues =
            arrOfFamiliesIncomeValues.filter(value => (value <= maxValue || value <= minValue));

        expect(arrOfIncorrectIncomeValues.length).toBe(0, `from ${minValue}
         ${arrOfIncorrectIncomeValues.join(' ')} to ${maxValue}`);
    });

    it('should verify family data', async () => {
        await matrixPage.clickRandomFamily();

        const familyData =
            await matrixPage.getFamilyData();

        await matrixPage.getVisitHomeBtn();

        const familyTitleData =
            await familyDetails.getFamilyTitleData();

        expect(familyTitleData).toEqual(familyData);

        familyDetails.scroll();

        const familyHeaderData =
            await familyHeader.getFamilyHeaderData();

        expect(familyHeaderData).toEqual(familyTitleData);
    });
});

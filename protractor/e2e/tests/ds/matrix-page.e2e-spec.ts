import { MatrixPo } from '../../pages/ds/matrix.po';
import { StreetComponentPo, Toggle } from '../../pages/ds/street-component.po';
import { ElementArrayFinder, ElementFinder } from 'protractor';
import { FamilyPo } from '../../pages/ds/family-component.po';
import { MainFamilyPo } from '../../pages/ds/main-family.po';
import { FamilyDescriptionPo } from '../../pages/ds/family-description.po';

describe('Street component',  () => {
    const matrixPage = new MatrixPo();
    const streetComponent = new StreetComponentPo();
    const familyPage = new FamilyPo(2);
    const mainFamilyPage = new MainFamilyPo();
    const familyDescriptionPage = new FamilyDescriptionPo();

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

    it('should name, income and country values match the values from the previous page.', async() => {
       await familyPage.getFamily();

       const familyInfo = await matrixPage.getFamilyInfo();

       await matrixPage.goVisit();

       const familyInfoTwo = await mainFamilyPage.getFamilyInfoTwo();

       expect(familyInfo.name).toEqual(familyInfoTwo.name);
       expect(familyInfo.income).toEqual(familyInfoTwo.income);
       expect(familyInfo.country).toEqual(familyInfoTwo.country);

       await mainFamilyPage.mainScroll();

       const familyInfoThree = await familyDescriptionPage.getFamilyInfoThree();

       expect(familyInfoTwo.name).toEqual(familyInfoThree.name);
       expect(familyInfoTwo.income).toEqual(familyInfoThree.income);
       expect(familyInfoTwo.country).toEqual(familyInfoThree.country);

    });
});

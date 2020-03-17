import { MatrixPo } from '../../pages/ds/matrix.po';
import { StreetComponentPo, Toggle } from '../../pages/ds/street-component.po';
import { ElementArrayFinder, ElementFinder } from 'protractor';
import { FamilyComponentPo } from '../../pages/ds/family-component.po';

describe('Street component',  () => {
    const matrixPage = new MatrixPo();
    const streetComponent = new StreetComponentPo();

    it('should filter families on the page', async () => {
        await matrixPage.open();
        const minValue = await streetComponent.moveToddler(Toggle.LEFT, 300);
        const maxValue = await streetComponent.moveToddler(Toggle.RIGHT, -300);

        const arrOfAllFamilies: ElementArrayFinder = matrixPage.allFamilies;

        const arrOfFamiliesIncomeValues =
            await arrOfAllFamilies.map((family: ElementFinder, index: number) => new FamilyComponentPo(index).getIncomeValue());

        const arrOfIncorrectIncomeValues =
            arrOfFamiliesIncomeValues.filter(value => (value <= maxValue || value <= minValue));

        expect(arrOfIncorrectIncomeValues.length).toBe(0, `from ${minValue}
         ${arrOfIncorrectIncomeValues.join(' ')} to ${maxValue}`);
    });
});

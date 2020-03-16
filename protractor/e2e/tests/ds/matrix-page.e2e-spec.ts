import { MatrixPo } from '../../pages/ds/matrix.po';
import { StreetComponentPo, Toggle } from '../../pages/ds/street-component.po';
import {browser, ElementArrayFinder, ElementFinder} from 'protractor';
import { FamilyPo } from '../../pages/ds/family-component.po';
import {getRandom} from '../../helper/utils';
import {HousePo} from '../../pages/ds/house-component.po';

describe('Street component',  () => {
    const matrixPage = new MatrixPo();
    const streetComponent = new StreetComponentPo();

    it('should filter families on the page', async () => {
        await matrixPage.open();
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
});

describe('Check selected family data', () => {
    const matrixPo = new MatrixPo();
    const housePo = new HousePo();
    it('should choose random family visit home and compare data', async () => {
        await matrixPo.open();
        const allVisibleFamilies = await matrixPo.allFamilies;
        const randomInd = getRandom(allVisibleFamilies.length - 1);
        const randomFamily = new FamilyPo(randomInd);
        await randomFamily.familyElement.click();
        const data = await randomFamily.getFamilyData();
        await housePo.open();

    });
});

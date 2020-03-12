import { MatrixPo } from '../../pages/ds/matrix.po';
import { StreetComponentPo, Toggle } from '../../pages/ds/street-component.po';
import {browser, ElementArrayFinder, ElementFinder} from 'protractor';
import { FamilyPo } from '../../pages/ds/family-component.po';
import {getRandom} from '../../helper/utils';

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
    it('should choose random family and click on it', async () => {
        await matrixPo.open();
        const allVisibleFamilies = await matrixPo.allFamilies;
        const randomInd = getRandom(allVisibleFamilies.length);
        const randomFamily = new FamilyPo(randomInd).family;
        await randomFamily.click();
        await browser.sleep(2000);
    });
});

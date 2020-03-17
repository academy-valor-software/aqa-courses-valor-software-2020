import { MatrixPo } from '../../pages/ds/matrix.po';
import {browser, protractor} from 'protractor';
import { FamilyPo } from '../../pages/ds/family-component.po';
import {getRandom} from '../../helper/utils';
import {HousePo} from '../../pages/ds/house-component.po';
import {IFamily} from '../../data/ds/family-data.interface';

describe('Check selected family data', () => {
    const matrixPo = new MatrixPo();
    const housePo = new HousePo();
    it('should choose random family visit home and compare data', async () => {
        await matrixPo.open();
        const allVisibleFamilies = await matrixPo.allFamilies;
        const randomInd = getRandom(allVisibleFamilies.length - 1);
        const randomFamily = new FamilyPo(randomInd);
        await randomFamily.familyElement.click();
        const familyData: IFamily = await randomFamily.getFamilyData();
        await randomFamily.clickVisitHome();
        const houseData: IFamily = await housePo.getFamilyData();
        await browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
        const houseDataFromHeader: IFamily = await housePo.getFamilyDataFromHeader();
        for (const key in familyData) {
            if (familyData.hasOwnProperty(key)) {
               expect(familyData[key]).toEqual(houseData[key]);
               expect(houseData[key]).toEqual(houseDataFromHeader[key]);
            }
        }
    });
});

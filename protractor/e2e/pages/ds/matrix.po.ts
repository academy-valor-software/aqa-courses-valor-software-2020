import { $$, browser } from 'protractor';
import { BaseComponent } from '../base.component';
import axios from 'axios';
import { getRandom } from '../../helper/utils';
import { FamilyComponentPo } from './family-component.po';

export class MatrixPo extends BaseComponent {
    readonly url = '/matrix';
    readonly allFamilies = $$('.image-content');

    async open() {
        await browser.get(this.url);
    }

    async getAllFamilies () {
        this.allFamilies.getSize();
    }

    async clickOnRndFamily() {
        const url = 'https://www.gapminder.org/dollar-street';
        const matrixPage = new MatrixPo();
        // TODO: Choose any family
        const countFamilies = await axios.get(url + '/v1/things?thing=Families')
            .then((data) => data.data.data.streetPlaces.length);
        expect(countFamilies).toEqual(349);
        // TODO: Replace with real value
        const randomId = getRandom(15);
        console.log('Total count of families from api: ' + countFamilies);
        console.log('Random family index: ' + randomId);

        await matrixPage.open();
        const id = getRandom(16);
        const familyByRandId  = await matrixPage.allFamilies.get(id);
        const selectedFamilyIncome = await new FamilyComponentPo(id).getIncomeValue();
        const selectedFamilyCountry = await new FamilyComponentPo(id).getCountryValue();
        console.log('Selected family income: ' + selectedFamilyIncome);
        console.log('Selected family country: ' + selectedFamilyCountry);
        await familyByRandId.click();
    }

    async scrollPage(pixels: number): Promise<void> {
        browser.executeScript(`window.scrollTo(0,${pixels});`);
    }
}



import { $, browser } from 'protractor';
import { BaseComponent } from '../base.component';
import { FamilyInfo } from '../../data/family-data.interface';

export class MainFamilyPo extends BaseComponent {
    readonly url = '/family';
    readonly nameTwoFamily = $('.title-info .left-title .desktop');
    readonly countryTwoFamily = $('.right-title:nth-child(1) .title');
    readonly incomeTwoFamily = $('.title-info .right-title:nth-child(2) .title');
    readonly familyContainer = $('family-header .short-family-info-container');

    async getFamilyInfoTwo(): Promise<FamilyInfo> {
        return Promise.all([
            this.getFamilyNameTwo(),
            this.getFamilyIncomeTwo(),
            this.getFamilyCountryTwo()
        ]).then(([name, income, country]) => ({ name, income, country }));
    }

    async getFamilyNameTwo(): Promise<string> {
        return await this.nameTwoFamily.getText()
            .then(value => String(value.replace(' family', '')));
    }

    async getFamilyIncomeTwo(): Promise<number> {
        return await this.incomeTwoFamily.getText()
            .then( value => Number(value.replace('$', '')));
    }

    async getFamilyCountryTwo(): Promise<string> {
        return this.countryTwoFamily.getText();
    }

    async mainHeight(): Promise<string> {
       return await this.familyContainer.getCssValue('bottom');
    }

    async mainScroll(): Promise<void> {
        const mainHeight = await this.mainHeight();
        await browser
            .touchActions()
            .scroll({ x: 0, y: parseInt(mainHeight, 10) })
            .perform();
    }
}

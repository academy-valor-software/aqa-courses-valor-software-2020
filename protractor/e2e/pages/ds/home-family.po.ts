import { $, browser } from 'protractor';
import { FamilyInformationPO } from './family-information.po';
import { getNumbers } from '../../helper/utils';
import { IFamily } from '../../data/family-data.interface';

export class FamilyHomePO extends FamilyInformationPO {
    private readonly name = $('.home-description-container .desktop');
    private readonly income = $('.home-info-container .right-title .title');
    private readonly country = $('.home-country-container .title');
    private readonly nameAndCountrySticky = $('.short-family-info-container .desktop');
    private readonly incomeSticky = $('.short-family-info-container .right-title .title');

    async getFamilyInformation(): Promise<IFamily> {
        const nameFullValue = await this.name.getText().then(value => value.trim());
        const nameValue = nameFullValue.substring(0, nameFullValue.indexOf(' '));
        const income = getNumbers(await this.income.getText());
        const country = await this.country.getText();
        console.log(`Name: ${nameValue}, income: $${income}, country: ${country}`);
        return {name: nameValue, income: income, country: country};
    }

    async scrollDown(pixels: number): Promise<void> {
        browser.executeScript(`window.scrollTo(0,${pixels});`);
    }

    async getFamilyInformationAfterScroll(): Promise<IFamily> {
        return super.getFamilyInformation(this.nameAndCountrySticky, this.incomeSticky);
    }
}

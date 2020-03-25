import {$, browser} from 'protractor';
import {IFamily} from '../../data/ds/family-data.interface';
import {getDigitsOnlyFromString} from '../../helper/utils';
import {FamilyInfoPo} from './family-information.po';

export class FamilyHomePo extends FamilyInfoPo {
    private readonly name = $('.home-description-container .desktop');
    private readonly income = $('.home-info-container .right-title .title');
    private readonly country = $('.home-country-container .title');
    private readonly nameAndCountrySticky = $('.short-family-info-container .desktop');
    private readonly incomeSticky = $('.short-family-info-container .right-title .title');

    async getFamilyInformation(): Promise<IFamily> {
        const nameFullValue = (await this.name.getText()).trim();
        const nameValue = nameFullValue.substring(0, nameFullValue.indexOf(' '));
        const income = getDigitsOnlyFromString(await this.income.getText());
        const country = await this.country.getText();

        return {name: nameValue, income: income, country: country};
    }

    async scrollDown(pixels: number): Promise<void> {
        browser.executeScript(`window.scrollTo(0,${pixels});`);
    }

    async getFamilyInformationAfterScroll(): Promise<IFamily> {
        return super.getFamilyInformation(this.nameAndCountrySticky, this.incomeSticky);
    }
}

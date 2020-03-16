import {ElementFinder, $$, $, browser} from 'protractor';
import {BaseComponent} from '../base.component';

export class HousePo extends BaseComponent {
    readonly url = '/family';
    private readonly infoContainer = $('.home-description-container');
    private readonly headerInfoContainer = $('.short-family-info-container');
    private readonly familyLocator = this.infoContainer.$$('.left-title .title').first();
    private readonly headerFamilyLocator = this.headerInfoContainer.$$('.left-title .title').first();
    private readonly incomeLocator = this.infoContainer.$$('.left-title .title').first();


    // constructor() {
    //     this.root = $(this.locator);
    // }
    //
    // get income(): ElementFinder {
    //     return this.root.$(this.incomeLocator);
    // }
    //
    // get country(): ElementFinder {
    //     return this.root.$(this.countryLocator);
    // }
    //
    // get familyElement(): ElementFinder {
    //     return this.root;
    // }
    //
    // async getCountry(): Promise<string> {
    //     return this.country.getText();
    // }
    //
    // async getFamilyName(): Promise<string> {
    //     return await this.family.getText().then(name => {
    //         const endInd = name.indexOf('family');
    //         return name.substring(0, endInd).trim();
    //     });
    // }
    //
    // async getIncomeValue(): Promise<number> {
    //     return await this.income.getText()
    //         .then(value => Number(value.replace(/\D/g, '')));
    // }
    // async getFamilyData(): Promise<object> {
    //     return {
    //        country: await this.getCountry(),
    //        name: await this.getFamilyName(),
    //        income: await this.getIncomeValue(),
    //     };
    // }
}

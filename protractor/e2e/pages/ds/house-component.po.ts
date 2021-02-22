import {$$, $} from 'protractor';
import {BaseComponent} from '../base.component';
import {IFamily} from '../../data/ds/family-data.interface';

export class HousePo extends BaseComponent {
    readonly url = '/family';
    private readonly familyLocator = $$('.home-info-container .left-title .title').first();
    private readonly incomeLocator = $('.home-info-container .right-title .title');
    private readonly countryLocator = $('.home-country-container .right-title .title');
    private readonly headerFamilyLocator = $$('.short-family-info-container .left-title .title').first();
    private readonly headerIncomeLocator = $('.short-family-info-container .right-title .title');
    private readonly header = $('.short-family-info-container');

    private async getFamily(): Promise<string> {
        return this.familyLocator.getText().then(name => {
            const endInd = name.indexOf('family');
            return name.substring(0, endInd).replace(/\s/g, '');
        });
    }
    private async getIncome(): Promise<string> {
        return this.incomeLocator.getText().then(income => income.substring(1).replace(/\s/g, ''));
    }

    private async getCountry(): Promise<string> {
        return this.countryLocator.getText().then(text => text.replace(/\s/g, ''));
    }

    private async getFamilyFromHeader(): Promise<string> {
        return this.headerFamilyLocator.getText().then(text => {
            const endInd = text.indexOf('family');
            return text.substring(0, endInd).replace(/\s/g, '');
        });
    }
    private async getIncomeFromHeader(): Promise<string> {
        return this.headerIncomeLocator.getText().then(income => {
            const endInd = income.indexOf('/month') - 1;
            return income.substring(1, endInd).replace(/\s/g, '');
        });
    }

    private async getCountryFromHeader(): Promise<string> {
        return this.headerFamilyLocator.getText().then(text => {
            const startInd = text.indexOf(',') + 1;
            return text.substring(startInd, text.length).replace(/\s/g, '');
        });
    }
    async getCountryH(): Promise<string> {
        return this.headerFamilyLocator.getText();
    }

    async getFamilyData(): Promise<IFamily> {
        return {
            country: await this.getCountry(),
            name: await this.getFamily(),
            income: await this.getIncome(),
        };
    }

    async getFamilyDataFromHeader(): Promise<IFamily> {
        await this.waitForVisible(this.header);
        return {
            country: await this.getCountryFromHeader(),
            name: await this.getFamilyFromHeader(),
            income: await this.getIncomeFromHeader(),
        };
    }
}

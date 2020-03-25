import {$} from 'protractor';
import {FamilyData} from '../../data/ds/family-data.interface';

export class FamilyHeaderPO {
    private readonly locator = $('.short-family-info-container');
    private readonly headerFamilyNameAndCountry = $('.short-family-info-container .title.desktop');
    private readonly headerFamilyIncome = $('.short-family-info-container .right-title .title');

    async getHeaderFamilyName(): Promise<string> {
        return this.headerFamilyNameAndCountry.getText()
            .then(value => String(value.split(' ' , 1)).trim());
    }

    async getHeaderFamilyCountry(): Promise<any> {
        return this.headerFamilyNameAndCountry.getText()
            .then(value => value.trim())
            .then(value => Array(value.split(',').pop()))
            .then(value => value.toString().trim());
    }

    async getHeaderFamilyIncome(): Promise<number> {
        return this.headerFamilyIncome.getText()
            .then(value => Number(value.replace(/\D/g, '')));
    }

    async getFamilyHeaderData(): Promise<FamilyData> {
        return Promise.all([
            this.getHeaderFamilyName(),
            this.getHeaderFamilyIncome(),
            this.getHeaderFamilyCountry()
        ]).then(([familyName, familyIncome, familyCountry]) => ({familyName, familyIncome, familyCountry}));
    }
}

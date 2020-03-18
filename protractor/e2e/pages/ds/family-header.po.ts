import {$} from 'protractor';

export class FamilyHeaderPO {
    private readonly locator = $('.short-family-info-container');
    private readonly headerFamilyNameAndCountry = $('.short-family-info-container .title.desktop');
    private readonly headerFamilyIncome = $('.short-family-info-container .right-title .title');

    async getLocator () {
        return this.locator;
    }
    async getHeaderFamilyName(): Promise<string> {
        return this.headerFamilyNameAndCountry.getText()
            .then(value => String(value.replace(' family , United States', '')));
    }
    async getHeaderFamilyCountry(): Promise<string> {
        return this.headerFamilyNameAndCountry.getText()
            .then(value => String(value.replace('Macintyre family , ', '')));
    }
    async getHeaderFamilyIncome(): Promise<number> {
        return this.headerFamilyIncome.getText()
            .then(value => Number(value.replace(/\D/g, '')));
    }
}

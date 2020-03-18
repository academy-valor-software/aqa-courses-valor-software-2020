import {$} from 'protractor';

export class FamilyDetailsPO {
    private readonly familyNameTitle = $('.home-info-container .left-title .title.desktop');
    private readonly familyIncomeTitle = $('.home-info-container .right-title .title');
    private readonly familyCountryTitle = $('.home-country-container .title');

    async getFamilyNameFromTitle(): Promise<string> {
        return this.familyNameTitle.getText()
            .then(value => String(value.replace(' family', '')));
    }
    async getFamilyIncomeFromTitle(): Promise<number> {
        return this.familyIncomeTitle.getText()
            .then(value => Number(value.replace(/\D/g, '')));
    }
    async getFamilyCountryFromTitle(): Promise<string> {
        return this.familyCountryTitle.getText();
    }
}

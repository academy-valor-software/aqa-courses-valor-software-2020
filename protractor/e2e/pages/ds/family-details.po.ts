import {$, browser} from 'protractor';
import {FamilyData} from '../../data/ds/family-data.interface';

export class FamilyDetailsPO {
    private readonly familyNameTitle = $('.home-info-container .left-title .title.desktop');
    private readonly familyIncomeTitle = $('.home-info-container .right-title .title');
    private readonly familyCountryTitle = $('.home-country-container .title');

    async getFamilyNameFromTitle(): Promise<string> {
        return this.familyNameTitle.getText()
            .then(value => value.replace('family', '').trim());
    }

    async getFamilyIncomeFromTitle(): Promise<number> {
        return this.familyIncomeTitle.getText()
            .then(value => Number(value.replace(/\D/g, '')));
    }

    async getFamilyCountryFromTitle(): Promise<string> {
        return this.familyCountryTitle.getText();
    }

    async getFamilyTitleData(): Promise<FamilyData> {
        return Promise.all([
            this.getFamilyNameFromTitle(),
            this.getFamilyIncomeFromTitle(),
            this.getFamilyCountryFromTitle()
        ]).then(([familyName, familyIncome, familyCountry]) => ({familyName, familyIncome, familyCountry}));
    }

    scroll() {
        browser.executeScript('window.scrollTo(0,document.body.scrollHeight)');
    }
}

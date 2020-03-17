import {$$, $} from 'protractor';
import {BaseComponent} from '../base.component';
import {FamilyInfo} from '../../data/family-data.interface';

export class MatrixPo extends BaseComponent {
    readonly url = '/matrix';
    readonly allFamilies = $$('.image-content');
    readonly nameFamily = $('.description-title h3 > span:first-child');
    readonly countryFamily = $('.description-title h3 > span:last-child');
    readonly incomeFamily = $('.house-info-content .header-container');
    readonly btnVisit = $('.description-actions .description-button[data-e2e ="visit-this-home"]');

    async getFamilyInfo(): Promise<FamilyInfo> {
        return Promise.all([
            this.getNameFamily(),
            this.getIncomeFamily(),
            this.getCountryFamily()
        ]).then(([name, income, country]) => ({ name, income, country }));
    }

    async getNameFamily(): Promise<string> {
        return await this.nameFamily.getText()
            .then(value => String(value.replace(' family,', '')));
    }

    async getIncomeFamily(): Promise<number> {
        return await this.incomeFamily.getText()
            .then( value => Number(value.replace('$ ', '').replace('/month', '')));
    }

    async getCountryFamily(): Promise<string> {
        return this.countryFamily.getText();
    }

    async goVisit(): Promise<void> {
        await this.btnVisit.click();
    }


}

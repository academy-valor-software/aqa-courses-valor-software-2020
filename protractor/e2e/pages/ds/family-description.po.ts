import { $, browser } from 'protractor';
import { FamilyInfo } from '../../data/family-data.interface';

export class FamilyDescriptionPo {
    readonly familyDescription = $('.short-family-info-container .description-container .left-title ');
    readonly familyIncomeDescription = $('.short-family-info-container .description-container .right-title');

    async getFamilyInfoThree(): Promise<FamilyInfo> {
        return Promise.all([
            this.getNameFamilyDescription(),
            this.getIncomeDescriptionFamily(),
            this.getCountryDescriptionFamily()
        ]).then(([name, income, country]) => ({ name, income, country }));
    }

    async getNameFamilyDescription(): Promise<string> {
        return await this.familyDescription.getText()
            .then(value => String(value.replace(/\s\w*\s.\s\w*/g, '')));
    }

    async getIncomeDescriptionFamily(): Promise<number> {
        return await this.familyIncomeDescription.getText()
            .then( value => Number(value.replace('$', '').replace(' /month', '')));
    }

    async getCountryDescriptionFamily(): Promise<string> {
        return await this.familyDescription.getText()
            .then(value => String(value.replace(/\w*\s\w*\s.\s/g, '')));
    }
}

import {$$, $} from 'protractor';
import {BaseComponent} from '../base.component';
import {FamilyData} from '../../data/ds/family-data.interface';
import {getRandomWithMax} from '../../helper/utils';

export class MatrixPo extends BaseComponent {
    readonly url = '/matrix';
    readonly allFamilies = $$('.image-content');
    private readonly familyIncome = $('.house-info-content .header-container');
    private readonly familyName = $('.description-title span:first-child');
    private readonly familyCountry = $('.description-title span:nth-child(2)');
    private readonly visitHomeBtn = $('.description-button[href*="family"]');

    async getFamilyIncome(): Promise<number> {
        return this.familyIncome.getText()
            .then(value => Number(value.replace(/\D/g, '')));
    }

    async getFamilyName(): Promise<string> {
        return this.familyName.getText()
            .then(value => String(value.replace(' family,', '')));
    }

    async getFamilyCountry(): Promise<string> {
        return this.familyCountry.getText();
    }

    async getFamilyData(): Promise<FamilyData> {
        return Promise.all([
            this.getFamilyName(),
            this.getFamilyIncome(),
            this.getFamilyCountry()
        ]).then(([familyName, familyIncome, familyCountry]) => ({ familyName, familyIncome, familyCountry }));
    }
    getVisitHomeBtn() {
        return this.visitHomeBtn.click();
    }

    clickRandomFamily() {
        return this.allFamilies.then($el => $el[getRandomWithMax($el.length - 1)].click());
    }
}

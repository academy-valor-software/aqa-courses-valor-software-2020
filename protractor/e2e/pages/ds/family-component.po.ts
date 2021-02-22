import {ElementFinder, $$, $} from 'protractor';
import {IFamily} from '../../data/ds/family-data.interface';

export class FamilyPo {
    private readonly locator = '.image-content';
    private readonly incomeLocator = '.place-image-box-income';
    private readonly countryLocator = '.place-image-box-country';
    private readonly family = $$('matrix-view-block .description-title span').first();
    private readonly visitHomeButton = $('[data-e2e="visit-this-home"]');
    private readonly root: ElementFinder;


    constructor(index: number) {
        this.root = $$(this.locator).get(index);
    }

    get income(): ElementFinder {
        return this.root.$(this.incomeLocator);
    }

    get country(): ElementFinder {
        return this.root.$(this.countryLocator);
    }

    get familyElement(): ElementFinder {
        return this.root;
    }

    async getCountry(): Promise<string> {
        return this.country.getText().then(text => text.replace(/\s/g, ''));
    }

    async getFamilyName(): Promise<string> {
        return await this.family.getText().then(name => {
            const endInd = name.indexOf('family');
            return name.substring(0, endInd).replace(/\s/g, '');
        });
    }

    async getIncomeValue(): Promise<string> {
        return await this.income.getText()
            .then(value => value.replace(/\D/g, ''));
    }
    async getFamilyData(): Promise<IFamily> {
        return {
           country: await this.getCountry(),
           name: await this.getFamilyName(),
           income: await this.getIncomeValue(),
        };
    }
    async clickVisitHome(): Promise<void> {
        await this.visitHomeButton.click();
    }
}

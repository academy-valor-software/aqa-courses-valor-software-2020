import { ElementFinder, $$ } from 'protractor';
import { getNumbers } from '../../helper/utils';

export class FamilyComponentPo {
    private readonly locator = '.image-content';
    private readonly incomeLocator = '.place-image-box-income';
    private readonly countryLocator = '.place-image-box-country';
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

    async getIncomeValue(): Promise<number> {
        return Number(getNumbers(await this.income.getText()));
    }

    async getCountryValue(): Promise<string> {
        return await this.country.getText()
            .then(value => value.trim());
        }
}

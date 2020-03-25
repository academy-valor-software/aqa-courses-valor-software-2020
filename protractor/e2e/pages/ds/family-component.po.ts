import { ElementFinder, $$ } from 'protractor';
import {getDigitsOnlyFromString} from '../../helper/utils';

export class FamilyPo {
    private readonly locator = '.image-content';
    private readonly incomeLocator = '.place-image-box-income';
    private readonly root: ElementFinder;

    constructor(index: number) {
        this.root = $$(this.locator).get(index);
    }

    get income(): ElementFinder {
        return this.root.$(this.incomeLocator);
    }

    async getIncomeValue(): Promise<number> {
        return Number(getDigitsOnlyFromString(await this.income.getText()));
    }
}

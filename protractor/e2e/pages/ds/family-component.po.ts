import { ElementFinder, $$ } from 'protractor';

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
        return await this.income.getText()
            .then(value => Number(value.replace(/\D/g, '')));
    }
}

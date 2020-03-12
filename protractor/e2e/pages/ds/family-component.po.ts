import { ElementFinder, $$ } from 'protractor';
import {IFamilyData} from '../../data/ds/family-data.interface';

export class FamilyPo {
    private readonly locator = '.image-content';
    private readonly incomeLocator = '.place-image-box-income';
    private readonly viewBlockLocator = '.place-image-box-income';
    private readonly root: ElementFinder;
    private data: IFamilyData;


    constructor(index: number) {
        this.root = $$(this.locator).get(index);
    }

    get income(): ElementFinder {
        return this.root.$(this.incomeLocator);
    }

    get name(): ElementFinder {
        return this.root.$(this.incomeLocator);
    }

    get country(): ElementFinder {
        return this.root.$(this.countryLocator);
    }

    get family(): ElementFinder {
        return this.root;
    }

    async getIncomeValue(): Promise<number> {
        return await this.income.getText()
            .then(value => Number(value.replace(/\D/g, '')));
    }
    getFamilyData(): [] {

    }
}

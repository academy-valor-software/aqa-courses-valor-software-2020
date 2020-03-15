import {$$, ElementFinder} from 'protractor';
import {BaseComponent} from '../base.component';

export class MatrixPo extends BaseComponent {
    readonly url = '/matrix';
    readonly allFamilies = $$('.image-content');

    async clickOnRandomFamily(): Promise<void> {
        const displayedFamilies = await this.allFamilies;
        const randomFamily: ElementFinder = await displayedFamilies[Math.floor(Math.random() * displayedFamilies.length)];
        await randomFamily.click();
    }
}

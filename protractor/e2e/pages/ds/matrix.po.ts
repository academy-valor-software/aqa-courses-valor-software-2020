import {$$} from 'protractor';
import {BaseComponent} from '../base.component';

export class MatrixPo extends BaseComponent {
    readonly url = '/matrix';
    readonly allFamilies = $$('.image-content');

    async clickOnRandomFamily(): Promise<void> {
        await this.allFamilies.get(Math.floor(Math.random() * await this.allFamilies.count())).click();
    }
}

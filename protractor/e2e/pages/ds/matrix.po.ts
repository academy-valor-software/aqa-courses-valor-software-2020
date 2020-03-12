import {$$} from 'protractor';
import {BaseComponent} from '../base.component';

export class MatrixPo extends BaseComponent {
    readonly url = '/matrix';
    readonly allFamilies = $$('.image-content');
}

import {$} from 'protractor';
import {IFamily} from '../../data/ds/family-data.interface';
import {FamilyInfoPo} from './family-information.po';

export class FamilyViewPo extends FamilyInfoPo {
    private readonly income = $('.view-image-block-container .header-container');
    private readonly nameAndCountry = $('.description-title:not(div)');
    private readonly visitHomeButton = $('.description-actions [href*=\'family?place\']');

    async getFamilyInformation(): Promise<IFamily> {
        return super.getFamilyInformation(this.nameAndCountry, this.income);
    }

    async clickVisitHome(): Promise<void> {
        await this.visitHomeButton.click();
    }
}

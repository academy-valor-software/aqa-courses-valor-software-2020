import { $ } from 'protractor';
import { FamilyInformationPO } from './family-information.po';
import { IFamily } from '../../data/family-data.interface';

export class FamilyPreviewPO extends FamilyInformationPO {
    private readonly income = $('.view-image-block-container .header-container');
    private readonly nameAndCountry = $('.description-title:not(div)');
    private readonly vstHomeBtn = $('.description-actions [href*="family?place"]');

    async getFamilyInformation(): Promise<IFamily> {
        return super.getFamilyInformation(this.nameAndCountry, this.income);
    }

    async clickVisitHome(): Promise<void> {
        await this.vstHomeBtn.click();
    }
}

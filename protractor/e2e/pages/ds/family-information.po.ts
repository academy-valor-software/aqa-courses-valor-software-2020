import {ElementFinder} from 'protractor';
import {IFamily} from '../../data/ds/family-data.interface';
import {getDigitsOnlyFromString} from '../../helper/utils';

export class FamilyInfoPo {

    async getFamilyInformation(nameAndCountry: ElementFinder, income: ElementFinder): Promise<IFamily> {
        const description = (await nameAndCountry.getText()).trim();
        const nameValue = description.substring(0, description.indexOf(' '));
        const incomeValue = getDigitsOnlyFromString(await income.getText());
        const country = description.substring(description.lastIndexOf(' ') + 1);

        return {name: nameValue, income: incomeValue, country: country};
    }
}

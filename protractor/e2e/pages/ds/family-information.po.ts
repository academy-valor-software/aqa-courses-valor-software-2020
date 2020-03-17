import {ElementFinder} from 'protractor';
import {getNumbers} from '../../helper/utils';
import {IFamily} from '../../data/family-data.interface';

export class FamilyInformationPO {

    async getFamilyInformation(nameAndCountry: ElementFinder, income: ElementFinder): Promise<IFamily> {
        const description = await nameAndCountry.getText().then(value => value.trim());
        const nameValue = description.substring(0, description.indexOf(' '));
        const incomeValue = getNumbers(await income.getText());
        const country = description.substring(description.lastIndexOf(' ') + 1);
        return {name: nameValue, income: incomeValue, country: country};
    }
}

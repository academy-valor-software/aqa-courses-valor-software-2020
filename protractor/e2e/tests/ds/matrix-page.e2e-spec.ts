import { MatrixPo } from '../../pages/ds/matrix.po';
import { StreetComponentPo, Toggle } from '../../pages/ds/street-component.po';
import {browser, ElementArrayFinder, ElementFinder} from 'protractor';
import { FamilyPo } from '../../pages/ds/family-component.po';
import {FamilyDetailsPO} from '../../pages/ds/family-details.po';
import {FamilyHeaderPO} from '../../pages/ds/family-header.po';



describe('Street component',  () => {
    const matrixPage = new MatrixPo();
    const streetComponent = new StreetComponentPo();
    const familyComponent = new FamilyPo(6);
    const familyDetails = new FamilyDetailsPO();
    const familyHeader = new FamilyHeaderPO();


    beforeEach(async () => {
        await matrixPage.open();
    });

    xit('should filter families on the page', async () => {
        const minValue = await streetComponent.moveToddler(Toggle.LEFT, 300);
        const maxValue = await streetComponent.moveToddler(Toggle.RIGHT, -300);

        const arrOfAllFamilies: ElementArrayFinder = matrixPage.allFamilies;

        const arrOfFamiliesIncomeValues =
            await arrOfAllFamilies.map((family: ElementFinder, index: number) => new FamilyPo(index).getIncomeValue());

        const arrOfIncorrectIncomeValues =
            arrOfFamiliesIncomeValues.filter(value => (value <= maxValue || value <= minValue));

        expect(arrOfIncorrectIncomeValues.length).toBe(0, `from ${minValue}
         ${arrOfIncorrectIncomeValues.join(' ')} to ${maxValue}`);
    });

    it('should verify family data', async () => {
        await familyComponent.getFamily();

        const familyData =
            await matrixPage.getFamilyData();

        await matrixPage.getVisitHomeBtn().click();

        const titleFamilyName =
            await familyDetails.getFamilyNameFromTitle();
        const titleFamilyIncome =
            await familyDetails.getFamilyIncomeFromTitle();
        const titleFamilyCountry =
            await familyDetails.getFamilyCountryFromTitle();

        expect(titleFamilyName).toEqual(familyData.familyName);
        expect(titleFamilyIncome).toEqual(familyData.familyIncome);
        expect(titleFamilyCountry).toEqual(familyData.familyCountry);

        browser.executeScript('window.scrollTo(0,document.body.scrollHeight)');

        const headerFamilyName =
            await familyHeader.getHeaderFamilyName();
        const headerFamilyCountry =
            await familyHeader.getHeaderFamilyCountry();
        const headerFamilyIncome =
            await familyHeader.getHeaderFamilyIncome();

        expect(headerFamilyName).toEqual(titleFamilyName);
        expect(headerFamilyCountry).toEqual(titleFamilyCountry);
        expect(headerFamilyIncome).toEqual(titleFamilyIncome);
    });
});

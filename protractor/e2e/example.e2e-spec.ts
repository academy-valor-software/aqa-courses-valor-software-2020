import {browser, $, element, by} from 'protractor';

describe('Demo Calculator Test', function () {
    beforeAll(() => {
        browser.waitForAngularEnabled(false);
    });
    beforeEach(() => {
        browser.get('http://juliemr.github.io/protractor-demo/');
    });
    it('check title',  () => {
        expect(browser.getTitle()).toEqual('Super Calculator');
    });
    it('fill inputs', () => {
       const firstInput = element(by.model('first'));
       const secondInput = element(by.model('second'));
       firstInput.sendKeys(5);
       secondInput.sendKeys(3);
    });
    it('button click',  () => {
       const button = $('#gobutton');
       button.click();
    });
    it('check the result', () => {
       const result = $('h2.ng-binding');
       expect(result.getText()).toEqual(8);
    });
    // it('should passed', async () => {
    //     const searchField = $('[name="q"]');
    //     const submitButton = $('center [value="Google search"]');
    //
    //     await browser.get('/');
    //     searchField.sendKeys('hello world');
    //     browser.sleep(5000);
    //     expect(true).toBe(true);
    // });

    // it('should failed', async () => {
    //     await browser.get('/');
    //     expect(true).toBe(false);
    // });
});

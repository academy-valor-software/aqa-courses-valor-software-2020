import {browser, by, element, $, protractor} from 'protractor';

const until = protractor.ExpectedConditions;
const usernameInput = element(by.name('username'));
const passwordInput =  element(by.name('password'));

xdescribe('HW#2: Protractor e2e tests', function () {

    beforeEach(async () => {
        await browser.manage().deleteAllCookies();
        await browser.get(browser.baseUrl + 'login?w=f&ngsw-bypass=');
        await browser.waitForAngular();
        await browser.waitForAngularEnabled(true);
        await browser.wait(until.visibilityOf(usernameInput));
    });

    afterEach(async () => {
        await browser.waitForAngularEnabled(true);
        await browser.executeScript('window.sessionStorage.clear();');
        await browser.executeScript('window.localStorage.clear();');
        await browser.manage().deleteAllCookies();
    });

    it('Should fail because of the invalid email format' , async () => {
        const errorMessageSelector = element(by.xpath('//span[contains(text(),\'Incorrect username or password provided.\')]'));
        const expectedErrorMessage = 'Incorrect username or password provided.';


        await usernameInput.sendKeys('email');
        await passwordInput.sendKeys('fuck123.');
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();

        expect(errorMessageSelector.getText()).toEqual(expectedErrorMessage);
        expect(await browser.getCurrentUrl()).toContain('login');
    });

    it('Should fail because of the invalid password' , async () => {
        const errorMessageSelector = $('div.form-error');
        const expectedErrorMessage = 'Please enter a valid username or email address.';

        await usernameInput.sendKeys('artembashlak@');
        await browser.wait(until.visibilityOf(errorMessageSelector), 10000, 'Too long :(');

        expect(errorMessageSelector.getText()).toEqual(expectedErrorMessage);
        expect(await browser.getCurrentUrl()).toContain('login');
    });

    it('Should be possible to login with valid credentials' , async () => {
        // await browser.get(browser.baseUrl + 'login');

        const expectedUsername = element(by.xpath('//h3[contains(text(),\'Artem B.\')]'));
        const expectedUrl =  'https://www.freelancer.com/dashboard';

        await browser.wait(until.visibilityOf(usernameInput));
        await usernameInput.sendKeys('artembashlak@gmail.com');
        await passwordInput.sendKeys('fuck123.');
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();

        expect(await browser.getCurrentUrl()).toEqual(expectedUrl);
        expect(expectedUsername.getText()).toContain('Artem');
    });

    it('Should be possible to change skills section' , async () => {
        const editProfileButton = element(by.xpath('//button[@class=\'btn btn-large btn-info btn-edit-trigger\']'));
        const profilePageButton = element(by.xpath('//a[contains(text(),\'Profile Page\')]'));
        const addSkillButton = element(by.xpath('//a[@id=\'add-skills-btn\']'));
        const addSkillModal = element(by.xpath('//div[@id=\'select-skill-category-modal\']'));
        const addSkillInput = element(by.xpath('//input[@placeholder=\'Search for relevant skills\']'));
        const seoSkillSelector = element(by.css('div[title=\'SEO\']'));
        const html5SkillSelector = element(by.css('div[title=\'HTML5\']'));
        const saveSkillButton = element(by.xpath('//button[@id=\'saveSkills\']'));
        const updatesNavigation = element(by.xpath('//fl-callout[4]//fl-callout-trigger[1]//fl-button[2]//button[1]'));
        const updatesNavigationFilterButton = element(by.xpath('//fl-bit[@class=\'Heading\']//button[@class=\'ButtonElement\']'));
        const html5FilteredUpdates = element(by.xpath('//label[contains(text(),\'HTML5\')]'));
        const seoFilteredUpdates = element(by.xpath('//label[contains(text(),\'SEO\')]'));

        await usernameInput.sendKeys('artembashlak@gmail.com');
        await passwordInput.sendKeys('fuck123.');
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();

        await browser.wait(until.presenceOf(profilePageButton));
        await profilePageButton.click();

        await browser.wait(until.presenceOf(editProfileButton));
        await editProfileButton.click();

        await browser.wait(until.presenceOf(addSkillButton));
        await addSkillButton.click();

        await browser.wait(until.presenceOf(addSkillModal));
        await addSkillInput.click();
        await addSkillInput.sendKeys('SEO');

        await browser.wait(until.presenceOf(seoSkillSelector));
        await seoSkillSelector.click();

        await addSkillInput.clear();
        await addSkillInput.sendKeys('HTML5');

        await browser.wait(until.presenceOf(html5SkillSelector));
        await html5SkillSelector.click();
        await saveSkillButton.click();

        await browser.wait(until.visibilityOf(updatesNavigation), 10000, 'fail to find updates in nav bar');
        await browser.wait(until.presenceOf(updatesNavigation));
        await updatesNavigation.click();

        await browser.wait(until.presenceOf(updatesNavigationFilterButton));
        await updatesNavigationFilterButton.click();

        await browser.wait(until.presenceOf(html5FilteredUpdates));
        expect(html5FilteredUpdates.getText()).toEqual('HTML5');
        expect(seoFilteredUpdates.getText()).toEqual('SEO');
    });
});

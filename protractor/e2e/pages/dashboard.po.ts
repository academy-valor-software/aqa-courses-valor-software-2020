import {$, browser, by, element, ElementFinder, protractor} from 'protractor';

import { BaseComponent } from './base.component';

export class DashboardPo extends BaseComponent {
  readonly url = '/dashboard';
  readonly until = protractor.ExpectedConditions;


  private readonly editProfileButton = element(by.xpath('//button[@class=\'btn btn-large btn-info btn-edit-trigger\']'));
  private readonly profilePageButton = element(by.xpath('//a[contains(text(),\'Profile Page\')]'));
  private readonly addSkillButton = element(by.xpath('//a[@id=\'add-skills-btn\']'));
  private readonly addSkillModal = element(by.xpath('//div[@id=\'select-skill-category-modal\']'));
  private readonly addSkillInput = element(by.xpath('//input[@placeholder=\'Search for relevant skills\']'));
  private readonly seoSkillSelector = element(by.css('div[title=\'SEO\']'));
  private readonly html5SkillSelector = element(by.css('div[title=\'HTML5\']'));
  private readonly saveSkillButton = element(by.xpath('//button[@id=\'saveSkills\']'));
  private readonly updatesNavigation = element(by.xpath('//fl-callout[4]//fl-callout-trigger[1]//fl-button[2]//button[1]'));
  private readonly updatesNavigationFilterButton = element(by.xpath('//fl-bit[@class=\'Heading\']//button[@class=\'ButtonElement\']'));
  private readonly html5FilteredUpdates = element(by.xpath('//label[contains(text(),\'HTML5\')]'));
  private readonly seoFilteredUpdates = element(by.xpath('//label[contains(text(),\'SEO\')]'));

  private readonly textUserInitials = $('fl-heading.Username-displayName');
  private readonly textUserId = $('fl-heading.Username-userId');

  async getUserInitials(): Promise<string> {
    return this.textUserInitials.getText();
  }

  async getUserId(): Promise<string> {
    return this.textUserId.getText();
  }

  async addSeoAndHtml5Skills(): Promise<void> {
    await browser.wait(this.until.presenceOf(this.profilePageButton));
    await this.profilePageButton.click();

    await browser.wait(this.until.presenceOf(this.editProfileButton));
    await this.editProfileButton.click();

    await browser.wait(this.until.presenceOf(this.addSkillButton));
    await this.addSkillButton.click();

    await browser.wait(this.until.presenceOf(this.addSkillModal));
    await this.addSkillInput.click();
    await this.addSkillInput.sendKeys('SEO');

    await browser.wait(this.until.presenceOf(this.seoSkillSelector));
    await this.seoSkillSelector.click();

    await this.addSkillInput.clear();
    await this.addSkillInput.sendKeys('HTML5');

    await browser.wait(this.until.presenceOf(this.html5SkillSelector));
    await this.html5SkillSelector.click();
    await this.saveSkillButton.click();

    await browser.wait(this.until.visibilityOf(this.updatesNavigation), 10000, 'fail to find updates in nav bar');
    await browser.wait(this.until.presenceOf(this.updatesNavigation));
    await this.updatesNavigation.click();

    await browser.wait(this.until.presenceOf(this.updatesNavigationFilterButton));
    await this.updatesNavigationFilterButton.click();
  }
}

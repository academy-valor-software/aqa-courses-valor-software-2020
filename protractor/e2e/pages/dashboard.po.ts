import {$, browser, by, element, protractor} from 'protractor';

import { BaseComponent } from './base.component';
import {safeClick} from '../helper/utils';

export class DashboardPo extends BaseComponent {
  readonly url = '/dashboard';
  readonly until = protractor.ExpectedConditions;

// TODO: change to css selectors
  private readonly profilePageBtn = $('fl-button[fltrackinglabel="ActivateFreelancerProfileButton"]');
  private readonly editProfileBtn = $('button.btn-edit-trigger:nth-child(1)');
  private readonly addSkillBtn = $('a.add-skills-btn');
  private readonly addSkillModal = $('div#select-skill-category-modal');
  private readonly addSkillInput = $('input.skill-selector-header-input');
  private readonly seoSkillSelector = $('div[title=\'SEO\']');
  private readonly html5SkillSelector = $('div[title=\'HTML5\']');
  private readonly saveSkillBtn = $('button#saveSkills');
  private readonly updatesNavigation = element(by.xpath('//fl-callout[4]//fl-callout-trigger[1]//fl-button[2]//button[1]'));
  private readonly updatesNavigationFilterBtn = element(by.xpath('//fl-bit[@class=\'Heading\']//button[@class=\'ButtonElement\']'));
  private readonly html5FilteredUpdates = $('fl-checkbox.List-content:nth-child(1)');
  private readonly seoFilteredUpdates = $('fl-checkbox.List-content:nth-child(2)');
  private readonly textUserInitials = $('fl-heading.Username-displayName');
  private readonly textUserId = $('fl-heading.Username-userId');

  async getUserInitials(): Promise<string> {
    return this.textUserInitials.getText();
  }

  async getUserId(): Promise<string> {
    return this.textUserId.getText();
  }

  async getHtml5Text(): Promise<string> {
    return this.html5FilteredUpdates.getText();
  }

  async getSeoText(): Promise<string> {
    return this.seoFilteredUpdates.getText();
  }

  async addSeoAndHtml5Skills(): Promise<void> {
    await safeClick(this.profilePageBtn);
    await safeClick(this.editProfileBtn);
    await safeClick(this.addSkillBtn);
    await safeClick(this.addSkillModal);
    await this.addSkillInput.click();
    await safeClick(this.addSkillInput);
    await this.addSkillInput.sendKeys('SEO');
    await safeClick(this.seoSkillSelector);
    await this.addSkillInput.clear();
    await this.addSkillInput.sendKeys('HTML5');
    await safeClick(this.html5SkillSelector);
    await this.saveSkillBtn.click();
    await browser.wait(this.until.visibilityOf(this.updatesNavigation), 10000, 'fail to find updates in nav bar');
    await safeClick(this.updatesNavigation);
    await safeClick(this.updatesNavigationFilterBtn);
  }
}

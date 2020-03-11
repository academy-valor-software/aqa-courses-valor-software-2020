import {$, $$, promise} from 'protractor/built';

import {BaseComponent} from './base.component';
import {IEducation} from '../data/edication-data.interface';

export class ProfilePo extends BaseComponent {
  readonly url = '/u/';

  private readonly brnEditProfInf = $('.EditButton button');
  private readonly inputProfHeadline = $('#professionalHeadlineEdit');
  private readonly inputProfSummary = $('#userSummaryEdit');
  private readonly inputHourRate = $('#hourlyRateEdit');
  private readonly btnSaveProfInf = $('[fltrackinglabel = "SaveButtonClick"]');
  private readonly textProfHeadline = $('app-user-profile-summary-tagline h2');
  private readonly textProfSummary = $('app-user-profile-summary-description div');
  private readonly textHourRate = $('app-user-profile-summary-information');

  private readonly btnAddEducation = $('[fltrackinglabel = "UserProfileAddEducation"]');
  private readonly selectorCountry = $('[fltrackinglabel="EducationEditCountrySelect"] select');
  private readonly selectorUniversity = $('[fltrackinglabel="EducationEditUniversitySelect"] select');
  private readonly inputDegree = $('[fltrackinglabel= "EducationEditDegree"] input');
  private readonly selectorStartYear = $('[fltrackinglabel= "EducationEditStartYear"] select');
  private readonly selectorEndYear = $('[fltrackinglabel= "EducationEditEndYear"] select');
  private readonly btnSaveEducation = $('app-user-profile-editable-ui-action-row fl-button:nth-of-type(2)');
  private readonly textLastAddedDegree = $$('.Degree h2').get(0);
  private readonly textLastAddedEducDetails = $$('app-user-profile-educations-view .Education-content').get(0);

  // private readonly btnEditProfile = $('.SummaryHeader button');
  private readonly btnAddSkillsIfEmptyList = $('[fltrackinglabel*="EmptySkills"] .ButtonElement');
  private readonly btnAddSkilsIfAnyAlredyExists = $('[fltrackinglabel*="TopSkills"] .ButtonElement');
  private readonly inputSearchSkills = $('.SearchInput input[placeholder="Search skills"]');
  private readonly checkboxSkills = $('fl-checkbox:nth-child(1) label');
  private readonly btnSaveSkills = $('[fltrackinglabel*="SaveSkills"] button');
  private readonly btnUpdates = $('[fltrackinglabel*="Updates"] button');
  private readonly btnUpdatesFilters = $('[fltrackinglabel*="Updates-Options"] button');
  private readonly checkboxFiltersFirstSkill = $('fl-checkbox:nth-child(1) label');
  private readonly checkboxFiltersSecondSkill = $('fl-checkbox:nth-child(2) label');
  private readonly iconLogo = $('.fl-logo');

  public async getHeadlineText(): Promise<string> {
    return this.textProfHeadline.getText();
  }

  public async getProfSummaryText(): Promise<string> {
    return this.textProfSummary.getText();
  }

  public async getHourRateText(): Promise<string> {
    return (await this.textHourRate.getText()).match('^.([0-9]{3})\\s')[0];
  }

  public async editAndSaveProfileInf(professionalHeadline: string, summary: string, hourRate: string): Promise<void> {
    await this.brnEditProfInf.click();
    await this.clearAndSetInputValue(this.inputProfHeadline, professionalHeadline);
    await this.clearAndSetInputValue(this.inputProfSummary, summary);
    await this.clearAndSetInputValue(this.inputHourRate, hourRate);
    await this.btnSaveProfInf.click();
  }

  public async addEducationItem(education: IEducation): Promise<void> {
    const {country, university, degree, startYear, endYear} = education;

    await this.btnAddEducation.click();
    await this.selectorCountry.sendKeys(country);
    await this.selectorUniversity.sendKeys(university);
    await this.inputDegree.sendKeys(degree);
    await this.selectorStartYear.sendKeys(startYear);
    await this.selectorEndYear.sendKeys(endYear);
    await this.btnSaveEducation.click();
  }

  public async getEducationDegree(): Promise<string> {
    return this.textLastAddedDegree.getText();
  }

  public async getEducationDetails(): Promise<string> {
    return this.textLastAddedEducDetails.getText();
  }

  public async addSkillsAndSave(skillsList: []): Promise<void> {

    try {
      if (this.btnAddSkillsIfEmptyList.isPresent) {
        await this.btnAddSkillsIfEmptyList.click();
      } else {
        await this.btnAddSkilsIfAnyAlredyExists.click();
      }
    } catch (err) {
      console.log('No any AddSkills element has been found');
    }

    for (let i = 0; i < skillsList.length; i++) {
      await this.clearAndSetInputValue(this.inputSearchSkills, skillsList[i]);
      await this.checkboxSkills.click();
    }
    await this.btnSaveSkills.click();
  }

  public async getUpdatesFilters(): Promise<promise.Promise<string>[]> {

    await this.goHomePage(this.iconLogo);
    await this.btnUpdates.click();
    await this.btnUpdatesFilters.click();
    return [this.checkboxFiltersFirstSkill.getText(), this.checkboxFiltersSecondSkill.getText()];

  }
}

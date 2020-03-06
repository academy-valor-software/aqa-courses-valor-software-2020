import {$, $$} from 'protractor';

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

  public async getHeadlineText(): Promise<string> {
    return this.textProfHeadline.getText();
  }

  public async getProfSummaryText(): Promise<string> {
    return this.textProfSummary.getText()
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
    return this.textLastAddedDegree.getText()
  }

  public async getEducationDetails(): Promise<string> {
    return  this.textLastAddedEducDetails.getText();
  }
}

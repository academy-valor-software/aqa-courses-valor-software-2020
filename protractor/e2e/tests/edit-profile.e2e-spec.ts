import { browser } from 'protractor/built';

import { LoginPo } from '../pages/login.po';
import { ProfilePo } from '../pages/profile.po';
import { HeaderPo } from '../pages/header.po';
import { accountData } from '../data/account-data.mock';
import { concatEducationDetailsString } from '../helper/utils';
import { educationData } from '../data/educaction-data.mock';


describe('Sign up functionality', () => {

  const loginPage = new LoginPo();
  const header = new HeaderPo();
  const profilePage = new ProfilePo();

  const { email, password, professionalHeadline, summary, hourRate } = accountData;
  const skillsArray = ['HTML5', 'SEO'];

  beforeAll(async () => {
    await loginPage.open();
    await loginPage.login(email, password);
    await header.openUserProfile();
  });

  afterEach(async () => {
    await browser.manage().deleteAllCookies();
  });

  it('should edit profile info card', async () => {
    await profilePage.editAndSaveProfileInf(professionalHeadline, summary, hourRate);

    await expect(await profilePage.getHeadlineText()).toEqual(professionalHeadline);
    await expect(await profilePage.getProfSummaryText()).toEqual(summary);
    await expect(await profilePage.getHourRateText()).toContain(hourRate);
  });

/*
  it('should add Skills to profile', async () => {
    await profilePage.addSkillsAndSave(skillsArray);
    expect(await profilePage.getUpdatesFilters()[0]).toEqual(skillsArray[0]);
    expect(await profilePage.getUpdatesFilters()[1]).toEqual(skillsArray[1]);
  });
*/

});



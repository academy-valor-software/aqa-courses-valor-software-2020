import {browser} from 'protractor';

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

  it('should add education item', async () => {
    await profilePage.addEducationItem(educationData);

    expect(await profilePage.getEducationDegree()).toEqual(educationData.degree);
    expect(profilePage.getEducationDetails()).toEqual(concatEducationDetailsString(educationData));
  });
});



import {browser, by, element} from 'protractor';

import { LoginPo } from '../pages/login.po';
import { ProfilePo } from '../pages/profile.po';
import { HeaderPo } from '../pages/header.po';
import { DashboardPo } from '../pages/dashboard.po';
import { accountData } from '../data/account-data.mock';
import { concatEducationDetailsString } from '../helper/utils';
import { educationData } from '../data/educaction-data.mock';

const loginPage = new LoginPo();
const header = new HeaderPo();
const profilePage = new ProfilePo();
const dashboardPage = new DashboardPo();
const { email, password, professionalHeadline, summary, hourRate } = accountData;

// TODO: find the reason why this section of tests fails
xdescribe('Sign up functionality', () => {
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

describe('Profile functionality', () => {
  beforeEach(async () => {
    await browser.manage().deleteAllCookies();
    await browser.waitForAngularEnabled(true);
  });

  afterEach(async () => {
    await browser.executeScript('window.sessionStorage.clear();');
    await browser.executeScript('window.localStorage.clear();');
  });

  it('should be possible to change skills section', async () => {
    await loginPage.open();
    await loginPage.login(email, password);

    expect(await dashboardPage.isUrlOpened()).toBe(true);

    await dashboardPage.addSeoAndHtml5Skills();

    expect(dashboardPage.getHtml5Text()).toEqual('HTML5');
    expect(dashboardPage.getSeoText()).toEqual('SEO');
  });
});


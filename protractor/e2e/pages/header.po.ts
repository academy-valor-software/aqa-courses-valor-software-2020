import { $ } from 'protractor';

import { BaseComponent } from './base.component';

export class HeaderPo extends BaseComponent {
  private readonly buttonUserSettings = $('[fltrackinglabel="UserSettings"] >button');
  private readonly linkViewProfile = $('[href*="/u/"]');

  async openUserProfile(): Promise<void> {
    await this.waitForVisible(this.buttonUserSettings);
    await this.buttonUserSettings.click();
    await this.linkViewProfile.click();
  }
}

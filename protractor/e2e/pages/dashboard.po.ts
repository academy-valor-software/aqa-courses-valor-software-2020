import { $ } from 'protractor/built';

import { BaseComponent } from './base.component';

export class DashboardPo extends BaseComponent {
  readonly url = '/dashboard';

  private readonly textUserInitials = $('fl-heading.Username-displayName');
  private readonly textUserId = $('fl-heading.Username-userId');

  async getUserInitials(): Promise<string> {
    return this.textUserInitials.getText();
  }

  async getUserId(): Promise<string> {
    return this.textUserId.getText();
  }
}

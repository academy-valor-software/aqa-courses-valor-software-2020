import { $ } from 'protractor';
import { BaseComponent } from './base.component';

export class LoginPo extends BaseComponent {
  readonly url = '/login';

  private readonly inputUserName = $('#username');
  private readonly inputPassword = $('#password');
  private readonly btnLogin = $('#login_btn');
  public readonly incorrectPasswordMessage = $('[class="alert alert-error"]');
  public readonly incorrectEmailMessage = $('.form-error');

  async login(email: string, password: string): Promise<void> {
    await this.waitForClickable(this.inputUserName);
    await this.clearAndSetInputValue(this.inputUserName, email);
    await this.clearAndSetInputValue(this.inputPassword, password);
    await this.btnLogin.click();
  }

}

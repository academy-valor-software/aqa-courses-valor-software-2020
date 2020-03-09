import { $ } from 'protractor';
import { BaseComponent } from './base.component';

export class LoginPo extends BaseComponent {
  readonly url = '/login';

  private readonly inputUserName = $('#username');
  private readonly inputPassword = $('#password');
  private readonly btnLogin = $('#login_btn');
  private readonly ErrorMessage = $('.alert-error span');
  private readonly FormError = $('.form-error');

  async login(email: string, password: string): Promise<void> {
    await this.waitForClickable(this.inputUserName);
    await this.clearAndSetInputValue(this.inputUserName, email);
    await this.clearAndSetInputValue(this.inputPassword, password);
    await this.btnLogin.click();
  }

  async getErrorMessage(): Promise<string> {
    return this.ErrorMessage.getText();
  }

  async getFormError(): Promise<string> {
    return this.FormError.getText();
  }
}

import { $ } from 'protractor';
import { BaseComponent } from './base.component';

export class LoginPo extends BaseComponent {
  readonly url = '/login';

  private readonly inputUserName = $('#username');
  private readonly inputPassword = $('#password');
  private readonly btnLogin = $('#login_btn');
  private readonly errorMessage = $('.alert-error span');
  private readonly formError = $('.form-error');

  async login(email: string, password: string): Promise<void> {
    await this.waitForClickable(this.inputUserName);
    await this.clearAndSetInputValue(this.inputUserName, email);
    await this.clearAndSetInputValue(this.inputPassword, password);
    await this.btnLogin.click();
  }

  async getErrorMessage(): Promise<string> {
    return this.errorMessage.getText();
  }

  async getFormError(): Promise<string> {
    return this.formError.getText();
  }
}

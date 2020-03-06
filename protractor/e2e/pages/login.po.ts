import {$} from 'protractor';
import {BaseComponent} from './base.component';

export class LoginPo extends BaseComponent {
  readonly url = '/login';

  private readonly inputUserName = $('#username');
  private readonly inputPassword = $('#password');
  private readonly btnLogin = $('#login_btn');
  private readonly textPswrdErrorMessage = $('.alert-error span');
  private readonly textEmailErrorMessage = $('.form-error');

  async login(email: string, password: string): Promise<void> {
    // in some cases(1/10), protractor says that email and password he set but visually I can see that they are empty.
    // Decided to wait for visibility of the field and then start to act
    await this.waitForClickable(this.inputUserName);
    await this.clearAndSetInputValue(this.inputUserName, email);
    await this.clearAndSetInputValue(this.inputPassword, password);
    await this.btnLogin.click();
  }

  async getEmailErrorText(): Promise<string> {
    return this.textEmailErrorMessage.getText();
  }

  async getPasswordErrorText(): Promise<string> {
    return this.textPswrdErrorMessage.getText();
  }
}

import {$} from 'protractor';
import { BaseComponent } from './base.component';

export class LoginPo extends BaseComponent {
  readonly url = '/login?w=f&ngsw-bypass=';

  private readonly inputUserName = $('#username');
  private readonly inputPassword = $('#password');
  private readonly btnLogin = $('#login_btn');
  private readonly errorMessageLocator = $('.alert.alert-error span');
  private readonly formErrorLocator = $('.form-error');

  async login(email: string, password: string): Promise<void> {
    await this.waitForClickable(this.inputUserName);
    await this.clearAndSetInputValue(this.inputUserName, email);
    await this.clearAndSetInputValue(this.inputPassword, password);
    await this.btnLogin.click();
  }
  async loginWithInvalidEmail(email: string, password: string): Promise<void> {
    await this.waitForClickable(this.inputUserName);
    await this.clearAndSetInputValue(this.inputUserName, email);
    await this.clearAndSetInputValue(this.inputPassword, password);
    await this.btnLogin.click();
  }
  async loginWithInvalidPassword(email: string, password: string): Promise<void> {
    await this.waitForClickable(this.inputUserName);
    await this.clearAndSetInputValue(this.inputUserName, email);
    await this.clearAndSetInputValue(this.inputPassword, password);
    await this.btnLogin.click();
  }
  async getErrorMessageText() {
    await this.waitForVisible(this.errorMessageLocator);
    return this.errorMessageLocator.getText();
  }
  async  getFormErrorMessage() {
    await this.waitForVisible(this.formErrorLocator);
    return this.formErrorLocator.getText();
  }
}

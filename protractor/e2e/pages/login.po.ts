import {$, ElementFinder} from 'protractor/built';
import { BaseComponent } from './base.component';

export class LoginPo extends BaseComponent {
  readonly url = '/login';
  private readonly iconLogo = $('.fl-logo');

  private readonly inputUserName = $('#username');
  private readonly inputPassword = $('#password');
  private readonly btnLogin = $('#login_btn');
  private readonly errorMessageContainer = $('.Modal-body .alert-error span');
  readonly errorMessage = 'Incorrect username or password provided.';

  async login(email: string, password: string): Promise<void> {
    await this.waitForClickable(this.inputUserName);
    await this.clearAndSetInputValue(this.inputUserName, email);
    await this.clearAndSetInputValue(this.inputPassword, password);
    await this.btnLogin.click();
    await this.goHomePage(this.iconLogo);

  }

  async errMessageCheck(): Promise<boolean> {
    return this.checkElementText(this.errorMessageContainer, this.errorMessage);
  }

}

import { $ } from 'protractor';
import { BaseComponent } from './base.component';

export class LoginPo extends BaseComponent {
  readonly url = '/login';

  private readonly inputUserName = $('#username');
  private readonly inputPassword = $('#password');
  private readonly btnLogin = $('#login_btn');
  private readonly errorMessage = $ (`.Modal-body .alert-error span`);

  private readonly errorIncorrectEmail = `Incorrect username or password provided.`;
  private readonly errorIncorrectPassword = ``;
 // private readonly endPointToCheck = `https://www.freelancer.com/login`;

  async checkErrorMessage(): Promise<boolean> {
      return ( await this.getElementText(this.errorMessage)).includes(this.errorIncorrectEmail);
  }

  async login(email: string, password: string): Promise<void> {
    await this.waitForClickable(this.inputUserName);
    await this.clearAndSetInputValue(this.inputUserName, email);
    await this.clearAndSetInputValue(this.inputPassword, password);
    await this.btnLogin.click();
  }
}

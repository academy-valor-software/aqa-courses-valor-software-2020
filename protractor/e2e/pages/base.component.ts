import {browser, ElementFinder, ExpectedConditions as EC} from 'protractor';

export class BaseComponent {
  url = '/';

  async open(additionalPath: string = ''): Promise<void> {
      await browser.get(this.url + additionalPath);
  }

  async isUrlOpened(): Promise<boolean> {
      return (await browser.getCurrentUrl()).includes(this.url);
  }

  async clearAndSetInputValue(element: ElementFinder, value: string): Promise<void> {
      await element.clear();
      await element.sendKeys(value);
  }

  async waitForVisible(element: ElementFinder, timeout?: number): Promise<void> {
      await browser.wait(EC.visibilityOf(element), timeout);
  }

  async waitForClickable(element: ElementFinder, timeout?: number): Promise<void> {
      await browser.wait(EC.elementToBeClickable(element), timeout);
  }
}

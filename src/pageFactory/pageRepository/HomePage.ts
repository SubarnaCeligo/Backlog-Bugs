import type { Page } from "@playwright/test";

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public get createFlowButton() {
    return this.page.locator('[data-test="createFlow"]');
  }
  public async open() {
    await this.page.goto("https://staging.integrator.io", {
      waitUntil: "domcontentloaded"
    });
    this.page.on("console", msg => console.log(msg.text()));
  }

  public async goToIntegrationTile() {
    await this.page.getByText("Automation Flows", { exact: true }).click();
  }

  public async goToPage(pageName: string) {
    var list = [], ele;
    if(pageName.includes('->')) {
      list = pageName.split('->');
      ele = await this.page.locator('[data-test="' + list[1] + '"]');
      if (await this.page.isVisible('[data-test="' + list[1] + '"]')) {
        await ele.click();
      } else {
        await this.page.locator('[data-test="' + list[0] + '"]').click();
        await this.page.locator('[data-test="' + list[1] + '"]').click();
      }
    } else {
      await this.page.locator('[data-test="' + pageName + '"]').click();
    }
    await this.page.waitForTimeout(5000);
    await this.page.waitForLoadState();
  }

  public async pasteFileContent(fileName: string, locator: string, nth?: number) {
    const fs = require('fs');
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    let textarea = await this.page.locator(locator);
    if (nth != undefined) {
      textarea = await this.page.locator(locator).nth(nth);
    }
    await this.page.waitForTimeout(3000);
    await textarea.focus();
    await this.page.keyboard.type(fileContent);
    await this.page.waitForTimeout(10000);
  }
}

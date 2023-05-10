import { WebActions } from "@lib/WebActions";
import type { Page } from "@playwright/test";

export class SettingsPage {
  private page: Page;
  public webActions: WebActions;

  constructor(page: Page) {
    this.page = page;
    this.webActions = new WebActions(this.page);
  }

  public get createFlowButton() {
    return this.page.locator('[data-test="createFlow"]');
  }

  public async goToFlowBuilder() {
    const ele = await this.createFlowButton;
    if (ele != null) await ele?.click();
    else throw new Error("No element, hence failed");
  }

  public async selectTextFromDropDown(value: string) {
    return this.webActions.selectTextfromDropDown(this.page, value);
  }

  public get eleAppSelection() {
    return this.page.locator('[data-test="application"] input[id*="react-select-"]');
  }
  
  public async pasteFileContent(fileName: string, locator: string) {
    const fs = require('fs');
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    let textarea = await this.page.locator(locator);
    await this.page.waitForTimeout(3000);
    await textarea.focus();
    await this.page.keyboard.type(fileContent);
    await this.page.waitForTimeout(10000);
  }

  public async selectApplication(appname: string) {
    const ele = await this.eleAppSelection;
    if (ele != null) {
      await ele.fill(appname);
      await this.page
        .locator("[data-test='" + appname + "']")
        .getByText(appname)
        .click();
      await this.page.waitForTimeout(2000);
    } else {
      throw new Error("No element, hence failed");
    }
  }
}

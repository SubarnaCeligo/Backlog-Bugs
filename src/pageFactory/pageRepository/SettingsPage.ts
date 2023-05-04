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

  public async screenshot(locator: string, screenshotName: string) {
    return this.page.locator(locator).screenshot({path: 'src/tests/MyAccount.spec.ts-snapshots/' + screenshotName + '.png'});
  }

  public get eleAppSelection() {
    return this.page.locator('[data-test="application"] input[id*="react-select-"]');
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

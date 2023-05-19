import { IO } from "@controller/IO";
import BasePage from "./BasePage";
import type { Page } from "@playwright/test";
import { ISettingsPage } from "@interface/ISettingsPage";

export class SettingsPage extends BasePage implements ISettingsPage {
  public get createFlowButton() {
    return this.page.locator('[data-test="createFlow"]');
  }

  public async goToFlowBuilder() {
    const ele = await this.createFlowButton;
    if (ele != null) await ele?.click();
    else throw new Error("No element, hence failed");
  }

  public async selectTextFromDropDown(value: string) {
    return this.selectTextfromDropDown(this.page, value);
  }

  public get eleAppSelection() {
    return this.page.locator(
      '[data-test="application"] input[id*="react-select-"]'
    );
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

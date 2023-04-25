import type { Page } from "@playwright/test";

export class SettingsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public get createFlowButton() {
    return this.page.locator('[data-test="createFlow"]');
  }

  public async goToFlowBuilder() {
    const ele = await this.createFlowButton;
    if (ele != null) await ele?.click();
    else throw new Error("No element, hence failed");
  }
}

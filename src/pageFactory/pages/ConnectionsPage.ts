import { Page, selectors } from "@playwright/test";
import BasePage from "./BasePage";

export class ConnectionsPage extends BasePage {

  CONNECTIONS_PAGE_URL = "/connections";

  public get eleAppSelection() {
    return this.page;
  }

  public async selectApplication(appname: string) {
    const ele = await this.eleAppSelection;
    if (ele != null) {
      await this.fill(this.selectors.ConnectionsPagePO.APP_NAME_INPUT,appname);
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

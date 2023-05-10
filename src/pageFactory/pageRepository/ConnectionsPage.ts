import type { Page } from "@playwright/test";
import { WebActions } from "@lib/WebActions";
import { ConnectionsPagePO } from "@objectOR/ConnectionsPagePO";

let webActions: WebActions, concPage: ConnectionsPagePO;

export class ConnectionsPage {
  private page: Page;
  CONNECTIONS_PAGE_URL = "/connections";

  public constructor(page: Page) {
    this.page = page;
    webActions = new WebActions(this.page);
    concPage = new ConnectionsPagePO();
  }

  public get eleAppSelection() {
    return this.page.locator(concPage.APP_NAME_INPUT);
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

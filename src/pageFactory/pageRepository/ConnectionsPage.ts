import type { Page } from "@playwright/test";
import { WebActions } from "@lib/WebActions";
import { ConnectionsPagePO } from "@objectOR/ConnectionsPagePO";
import { determineControlType } from "../../utilities/commonUtils";

let webActions: WebActions, concPage: ConnectionsPagePO;

export class ConnectionsPage {
  private page: Page;

  FTP_BASIC: {
    name: "name";
    "ftp.hostURI": "hostURI";
    "ftp.username": "username";
    "ftp.port": "port";
    "custom:[class^='MuiButtonBase-root MuiButton-root MuiButton-outlined jss']": "action";
    testsaveAndClose: "action";
  };

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

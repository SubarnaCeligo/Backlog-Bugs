import type { Page } from "@playwright/test";
import BasePage from "./BasePage";
import { IConnectionsPage } from "@interface/IConnectionsPage";

export class ConnectionsPage extends BasePage implements IConnectionsPage{
  public get eleAppSelection() {
    return this.page;
  }

  public async selectApplication(appname: string) {
    const ele = await this.eleAppSelection;
    if (ele != null) {
      await this.fill(
        this.selectors.ConnectionsPagePO.APP_NAME_INPUT,
        appname
      );
      await this.page
        .locator("[data-test='" + appname + "']")
        .getByText(appname)
        .click();
      await this.page.waitForTimeout(2000);
    } else {
      throw new Error("No element, hence failed");
    }
  }

  public async fillConnectionForm(data: any) {

  }

  public async editConnectionForm(data: any, connectionId: string) {}
}

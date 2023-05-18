import type { Page } from "@playwright/test";
import BasePage from "./BasePage";
import { IConnectionsPage } from "@interface/IConnectionsPage";
import * as selectors from "@selectors/Selectors";

export class ConnectionsPage extends BasePage implements IConnectionsPage {
  public get eleAppSelection() {
    return this.page;
  }

  public async selectApplication(appname: string) {
    const ele = await this.eleAppSelection;
    if (ele != null) {
      await this.fill(this.selectors.ConnectionsPagePO.APP_NAME_INPUT, appname);
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
    await this.click(selectors.ConnectionsPagePO.CREATE_CONNECTION);
    await this.selectApplication(data.APP_NAME);
    let app = data.APP_NAME;
    switch (app.toUpperCase()) {
      case "MAGENTO 2":
        await this.fillMagentoConnection(data);
        break;
    }
  }

  private async fillMagentoConnection(data: any) {
    await this.fill(selectors.ConnectionsPagePO.NAME, data.NAME);
    await this.fill(
      selectors.ConnectionsPagePO.MAGENTO2_BASE_URI,
      data.MAGENTO2_BASE_URI
    );
    await this.fill(
      selectors.ConnectionsPagePO.MAGENTO2_USERNAME,
      data.MAGENTO2_USERNAME
    );
    await this.fill(
      selectors.ConnectionsPagePO.MAGENTO2_PASSWORD,
      data.MAGENTO2_PASSWORD
    );
    await this.click(selectors.ConnectionsPagePO.TEST_CONNECTION);
  }
  public async editConnectionForm(data: any, connectionId: string) {}
}

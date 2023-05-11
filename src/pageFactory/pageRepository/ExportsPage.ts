import type { Page } from "@playwright/test";
import { WebActions } from "@lib/WebActions";
import { ExportsPagePO } from "@objectOR/ExportsPagePO";
import { CommonPagePO } from "@objects/CommonPagePO";

let webActions: WebActions,
  exportsPagePO: ExportsPagePO,
  commonPagePO: CommonPagePO;

export class ExportsPage {
  private page: Page;
  EXPORTS_PAGE_URL = "/exports";

  public constructor(page: Page) {
    this.page = page;
    webActions = new WebActions(this.page);
    exportsPagePO = new ExportsPagePO();
    commonPagePO = new CommonPagePO();
  }

  public async fillQueryParameters(map: Map<any, any>) {
    var qname = exportsPagePO.QUERY_PARAMETERS_NAME_FIELD;
    var qvalue = exportsPagePO.QUERY_PARAMETERS_VALUE_FIELD;
    var queryparams;
    for (let [K, V] of map) {
      queryparams = await this.page.$$(exportsPagePO.QUERY_PARAMETERS_ROW);
      var i = queryparams.length - 1;
      await this.page.locator(qname + i + '"]').fill(K);
      await this.page.locator(qvalue + i + '"]').fill(V);
    }
  }

  public async selectConnection(connectionName: string) {
    var listBox = await webActions.page
      .locator(commonPagePO.CONNECTION + " div")
      .nth(0)
      .getAttribute("aria-haspopup");
    if (listBox == "listbox") {
      await webActions.click(commonPagePO.CONNECTION);
      await webActions.selectTextfromDropDown(this.page,connectionName);
    } else {
      await webActions.click(commonPagePO.CONNECTION);
      await webActions.fill(exportsPagePO.CONNECTIONS_DROPDOWN, connectionName);
      await webActions.page.keyboard.press("ArrowDown");
      await webActions.page.keyboard.press("Enter");
    }
  }
}

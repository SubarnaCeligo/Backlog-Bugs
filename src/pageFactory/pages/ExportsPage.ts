import type { Page } from "@playwright/test";
import {test} from "@playwright/test";
import BasePage from "./BasePage";


export class ExportsPage extends BasePage{
  EXPORTS_PAGE_URL = "/exports";

  public async fillQueryParameters(map: Map<any, any>) {
    var qname = this.selectors.ExportsPagePO.QUERY_PARAMETERS_NAME_FIELD;
    var qvalue = this.selectors.ExportsPagePO.QUERY_PARAMETERS_VALUE_FIELD;
    var queryparams;
    for (let [K, V] of map) {
      queryparams = await this.page.$$(this.selectors.ExportsPagePO.QUERY_PARAMETERS_ROW);
      var i = queryparams.length - 1;
      await this.page.locator(qname + i + '"]').fill(K);
      await this.page.locator(qvalue + i + '"]').fill(V);
    }
  }

  public async selectConnection(connectionName: string) {
    var listBox = await this.page
      .locator(this.selectors.BasePagePO.CONNECTION + " div")
      .nth(0)
      .getAttribute("aria-haspopup");
    if (listBox == "listbox") {
      await this.click(this.selectors.BasePagePO.CONNECTION);
      await this.selectTextfromDropDown(this.page,connectionName);
    } else {
      await this.click(this.selectors.BasePagePO.CONNECTION);
      await this.fill(this.selectors.ExportsPagePO.CONNECTIONS_DROPDOWN, connectionName);
      await this.page.keyboard.press("ArrowDown");
      await this.page.keyboard.press("Enter");
    }
  }
}

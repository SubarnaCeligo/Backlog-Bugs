import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C53343 Verify Base URI is not present in UPS Connection page", () => {
  test.only("C53343 Verify Base URI is not present in UPS Connection page", async ({io, page}) => {
      await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
      await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'ups');
      await io.connectionPage.click(selectors.connectionsPagePO.UPS_CONNECTION);
      await expect(page.getByText('Base URI')).not.toBeVisible();
  });
});
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C94287 Verify user should be able to see the connection dropdown`, () => {
  test(`@Env-All @Zephyr-IO-T2345 C94287 Verify user should be able to see the connection dropdown`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
    await io.exportsPage.clickByText("REST API (HTTP)");
    await io.exportsPage.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST,
      "Connection dropdown is not displayed"
    );
  });
});

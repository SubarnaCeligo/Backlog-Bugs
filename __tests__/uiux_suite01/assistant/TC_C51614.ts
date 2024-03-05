import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(" C51614 Verify the name field under lookups", () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(" Verify the name field under lookups", async ({ io, page }) => {
    await io.homePage.clickByText("Tools")
    await io.homePage.clickByText( "Flow builder");
    await io.flowBuilder.click(selectors.basePagePO.LOOKUP_ADD_BUTTON);
    await io.flowBuilder.click(selectors.connectionsPagePO.LOOP_RETURN_CONNECTION);

    await page.getByRole("menuitem").nth(2).click();
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.flowBuilder.clickByText("Loop Returns NoVer");
    await io.flowBuilder.clickByText("Next");

    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.NAME_ID);

    await io.assert.verifyElementContainsText(
      selectors.basePagePO.NAME_ID,
      "Name your lookup"
    );
  });
});

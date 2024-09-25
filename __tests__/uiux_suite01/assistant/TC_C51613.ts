import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(" C51613 Verify the name field under exports", () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T18932 @Priority-P2 Verify the name field under exports", async ({ io, page }) => {
    await io.homePage.clickByText("Resources")
    await io.homePage.clickByText( "Exports");
    await io.importsPage.clickByText("Create export");
    await io.importsPage.click(selectors.connectionsPagePO.LOOP_RETURN_CONNECTION);
    await io.importsPage.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.importsPage.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "loop");
    await io.importsPage.clickByText("Next");

    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.LABEL_NAME_SELECTOR
    );
    io.assert.verifyElementContainsText(
      selectors.basePagePO.LABEL_NAME_SELECTOR,
      "Name your export"
    );
  });
});

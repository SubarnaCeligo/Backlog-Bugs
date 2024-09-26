import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(" C51614 Verify the name field under lookups", () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T18933 @Priority-P2 Verify the name field under lookups", async ({ io, page }) => {
    await io.homePage.clickByText("Tools")
    await io.homePage.clickByText("Flow builder");
    await io.flowBuilder.click(selectors.basePagePO.LOOKUP_ADD_BUTTON);
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "Loop Returns"
    );
    await io.flowBuilder.click(selectors.connectionsPagePO.LOOP_RETURN_CONNECTION);
    await page.getByRole("menuitem").nth(2).click();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.NAME_ID);

    await io.assert.verifyElementContainsText(
      selectors.basePagePO.NAME_ID,
      "Name your lookup"
    );
  });
});

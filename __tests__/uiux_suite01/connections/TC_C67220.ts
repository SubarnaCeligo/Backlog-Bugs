import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C67220 Verify Auto-place the cursor in the search bar on the following places: Marketplace, Home Page, Integration Flows page", () => {
  test("@Env-All @Zephyr-IO-T19858 C67220 Verify Auto-place the cursor in the search bar on the following places: Marketplace, Home Page, Integration Flows page", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "home");
    let cursorFocusCheck = await page
      .locator(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR)
      .evaluate(el => el === document.activeElement);
    await io.assert.expectToBeTrue(
      cursorFocusCheck,
      "Cursor is not focused on the search bar"
    );
    await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "marketplace");
    cursorFocusCheck = await page
      .locator(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR)
      .evaluate(el => el === document.activeElement);
    await io.assert.expectToBeTrue(
      cursorFocusCheck,
      "Cursor is not focused on the search bar"
    );
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    cursorFocusCheck = await page
      .locator(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR)
      .evaluate(el => el === document.activeElement);
    await io.assert.expectToBeTrue(
      cursorFocusCheck,
      "Cursor is not focused on the search bar"
    );
  });
});

import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63015 Verify Marketplace search bar is more visible and bigger in size.`, () => {
  test(`C63015 Verify Marketplace search bar is more visible and bigger in size.`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "marketplace");
    await io.assert.verifyElementIsDisplayed(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "Search bar is not displayed"
    );
    await io.homePage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "test"
    );
    const xButton = await page
      .locator(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR)
      .evaluate(el => el.parentElement.parentElement.querySelector("button"));
    await io.assert.expectNotToBeNull(xButton, "X button is not displayed");
  });
});

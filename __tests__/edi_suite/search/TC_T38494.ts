import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that cursor focus on search bar is maintained after hitting Enter on EDI dashboard", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Epic-IO-95266 @Priority-P2 @Zephyr-IO-T38494 Verify that cursor focus on search bar is maintained after hitting Enter on EDI dashboard", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Wait for EDI activity tab to be visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED);


    //Enter the search term with leading/trailing spaces
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_SEARCH_BOX);
    await io.homePage.fill(selectors.dashboardPagePO.EDI_SEARCH_BOX, "testterm");
    await page.keyboard.press('Enter');
    await io.homePage.loadingTime();

    // Verify if the cursor is on the input box
    const isFocused = await page.evaluate((selector) => {
      const inputElement = document.querySelector(selector);
      return document.activeElement === inputElement;
    }, selectors.dashboardPagePO.EDI_SEARCH_BOX);

    await io.assert.expectToBeTrue(isFocused, 'Cursor is on the input box.');

  });
});
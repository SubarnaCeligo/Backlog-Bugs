import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that only 30 characters are allowed in the search term", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Env-IAQA @Epic-IO-85710 @Priority-P2 @Zephyr-IO-T38142 Verify that only 30 characters are allowed in the search term", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Wait for EDI activity tab to be visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED)

    //Verify if doc num is default
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_SEARCH_BOX);
    await io.homePage.fill(selectors.dashboardPagePO.EDI_SEARCH_BOX, "abcdeabcdeabcdeabcdeabcdeabcdeabcde");
    await page.keyboard.press('Enter');
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText("Must be between 3 and 30 characters", 'Error message is not displayed');
  
  });
});
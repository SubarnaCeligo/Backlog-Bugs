import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that the user can modify the search field after entering a string", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-85710 @Priority-P2 @Zephyr-IO-T38146 Verify that the user can modify the search field after entering a string", async ({ io, page }) => {

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
    await io.homePage.fill(selectors.dashboardPagePO.EDI_SEARCH_BOX, "abcd");
    await page.keyboard.press('Enter');
    await io.homePage.loadingTime();
   //Verify if doc num is default
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.DEFAULT_DOC_NUMBER, "Doc number is not set by default");

    //Open pulldown menu
    await io.homePage.click(selectors.dashboardPagePO.SEARCH_PULLDOWN_MENU);
    await io.homePage.waitForElementAttached(selectors.basePagePO.LIST_BOX);

    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.PULLDOWN_SENDER_ID);
    await io.homePage.click(selectors.dashboardPagePO.PULLDOWN_SENDER_ID);

    //Verify that search by field can be changed
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.PULLDOWN_SENDER_ID_SELECTED, "Search by field cannot be changed after entering search term");
  
 
  });
});
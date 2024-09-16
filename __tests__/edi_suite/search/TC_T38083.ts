import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that the new search text box has a 'Search by' pulldown list with all the supported searchable fields", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Env-IAQA @Epic-IO-85710 @Priority-P2 @Zephyr-IO-T38083 Verify that the new search text box has a 'Search by' pulldown list with all the supported searchable fields", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Wait for EDI activity tab to be visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED)

    //Open pulldown menu
    await io.homePage.click(selectors.dashboardPagePO.SEARCH_PULLDOWN_MENU);
    await io.homePage.waitForElementAttached(selectors.basePagePO.LIST_BOX);

    //Verify pull down menu options are visible
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.PULLDOWN_DOCNUM, "Document number is not displayed");
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.PULLDOWN_SENDER_ID, "Interchange sender ID is not displayed");
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.PULLDOWN_RECEIVER_ID, "Interchange receiver ID is not displayed");
  });
});
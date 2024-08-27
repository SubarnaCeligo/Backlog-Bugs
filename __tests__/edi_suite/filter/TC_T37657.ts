import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that filter results are updated when the user updates the date range filter on the EDI dashboard", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Epic-IO-89826 @Priority-P2 @Zephyr-IO-T37657 Verify that filter results are updated when the user updates the date range filter on the EDI dashboard", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED)


    //Get all available FA filter values
    await io.homePage.clickByTextByIndex("FA status", 0);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    let index = 0;//Value=Rejected
    await io.homePage.clickByIndex(selectors.dashboardPagePO.FA_FILTER_CHECKBOX, index);
    await io.homePage.clickByTextByIndex('Apply', 0);
    await io.homePage.loadingTime();

    let resultArray01: string[] = [];
    if(await io.homePage.isVisible(selectors.dashboardPagePO.FA_STATUS_COLUMN)){
    let result = (await io.homePage.getText(selectors.dashboardPagePO.FA_STATUS_COLUMN)).toString();
     resultArray01 = result.split(',');
    }

    //Click on date filter
    await io.homePage.click(selectors.myAccountPagePO.DATEFILTER);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.homePage.clickByText('Last 180 days');
    await io.homePage.clickByText('Apply');
    await io.homePage.loadingTime();

    let resultArray02: string[] = [];
    if(await io.homePage.isVisible(selectors.dashboardPagePO.FA_STATUS_COLUMN)){
    let result = (await io.homePage.getText(selectors.dashboardPagePO.FA_STATUS_COLUMN)).toString();
     resultArray02 = result.split(',');
    }
    await io.assert.expectToBeTrue (resultArray02.length > resultArray01.length, 'Results are not updated as per updated date range filter');

  });
});
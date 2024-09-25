import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that faStatus for inprogress is shown in readable format.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-31713 @Priority-P2 @Zephyr-IO-T32632 Verify that faStatus for inprogress is shown in readable format.", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED)

    //Click on date filter
    await io.homePage.click(selectors.myAccountPagePO.DATEFILTER);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.homePage.clickByText('Last 180 days');
    await io.homePage.clickByText('Apply');
    await io.homePage.loadingTime();

    //Get all available FA filter values
    await io.homePage.clickByTextByIndex("FA status", 0);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    let index = 5;
    let filters = (await io.homePage.getText(selectors.dashboardPagePO.FA_FILTER_VALUES)).toString();
    let filtersArray: string[] = filters.split(',');

    await io.homePage.clickByIndex(selectors.dashboardPagePO.FA_FILTER_CHECKBOX, index);
    await io.homePage.clickByTextByIndex('Apply', 0);
    await io.homePage.loadingTime();

    let result = (await io.homePage.getText(selectors.dashboardPagePO.FA_STATUS_COLUMN)).toString();
    let resultArray: string[] = result.split(',');
    await io.assert.expectToBeValueInArray(resultArray, 'In Progress', 'In Progress documents are not shown');
   
  });
});
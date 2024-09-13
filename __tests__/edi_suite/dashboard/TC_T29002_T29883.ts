import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that entries on Documents dashboard are paginated.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Epic-IO-31713 @Priority-P2 @Zephyr-IO-T29002 @Zephyr-IO-T29883 Verify that entries on Documents dashboard are paginated.", async ({ io, page }) => {

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
 
     //Get all available filter values
     await io.homePage.clickByText('Last 180 days');
     await io.homePage.clickByText('Apply');
     await io.homePage.loadingTime();

    //Verify default pagination
    let numOfRowsString = (await io.homePage.getText(selectors.dashboardPagePO.ROWS)).toString();
    let numOfRowsArray: string[] = numOfRowsString.split(',');
    let numOfRows = numOfRowsArray.length;
    await io.assert.expectToBeValue('100', numOfRows.toString(), '100 rows are not displayed');

    //Change Records per page to 10
    await io.homePage.clickByIndex(selectors.dashboardPagePO.PAGINATION_CHEVRON, 2);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.TEN_ITEMS_PER_PAGE);
    await io.homePage.click(selectors.dashboardPagePO.TEN_ITEMS_PER_PAGE);
    await io.homePage.loadingTime();

    //Verify 10 records per page
    let numOfRowsString2 = (await io.homePage.getText(selectors.dashboardPagePO.ROWS)).toString();
    let numOfRowsArray2: string[] = numOfRowsString2.split(',');
    let numOfRows2 = numOfRowsArray2.length;
    await io.assert.expectToBeValue('10', numOfRows2.toString(), '10 rows are not displayed');

    //Go to Next page
    await io.homePage.click(selectors.dashboardPagePO.NEXT_PAGE);
    await io.homePage.loadingTime();

    //Verify if 10 records as displayed on next page as well
    let numOfRowsString3 = (await io.homePage.getText(selectors.dashboardPagePO.ROWS)).toString();
    let numOfRowsArray3: string[] = numOfRowsString3.split(',');
    let numOfRows3 = numOfRowsArray3.length;
    await io.assert.expectToBeValue('10', numOfRows3.toString(), '10 rows are not displayed');

  });
});
import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify sorting on other sortable columns on flows dashboard", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Epic-IO-31713 @Priority-P2 @Zephyr-IO-T29015 Verify sorting on other sortable columns on flows dashboard", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED);

    //Open flows dashboard
    await io.homePage.clickByTextByIndex('Documents', 0);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FLOWS);
    await io.homePage.click(selectors.dashboardPagePO.FLOWS);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FILTER_BUTTON);

    //Click on date filter
    await io.homePage.click(selectors.myAccountPagePO.DATEFILTER);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    //Get all available filter values
    await io.homePage.clickByText('Last 30 days');
    await io.homePage.clickByText('Apply');
    await io.homePage.loadingTime();

    await io.homePage.clickByTextByIndex('Total flow runs', 0);
    // await io.homePage.waitForElementAttached('[aria-sort="ascending"]');
    await io.homePage.loadingTime();
    await io.homePage.clickByTextByIndex('Total flow runs', 0);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DESCENDING);
    
    let runs = (await io.homePage.getText(selectors.dashboardPagePO.DATA_PROCESSED_ON)).toString();
    let runsArray: string[] = runs.split(',');
    const numberArray: number[] = runsArray.map(Number);

    let sorted = true
    for (let i = 0; i < numberArray.length - 1; i++)  {
      if (numberArray[i] < numberArray[i + 1]) {
        sorted = false;
    }
  }
     await io.assert.expectToBeTrue(sorted, 'Runs column is not sorted in descending order'); 
   

  });
});
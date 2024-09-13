import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify sorting on other sortable columns on documents dashboard", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-31713 @Priority-P2 @Zephyr-IO-T29011 Verify sorting on other sortable columns on documents dashboard", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED);

    //Click on date filter
    await io.homePage.click(selectors.myAccountPagePO.DATEFILTER);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    //Get all available filter values
    await io.homePage.clickByText('Last 180 days');
    await io.homePage.clickByText('Apply');
    await io.homePage.loadingTime();

    
    await io.homePage.click(selectors.flowBuilderPagePO.NAME_WDIO + ' span');
    await io.homePage.loadingTime();
   
    await io.homePage.click(selectors.dashboardPagePO.DOWNWARD_ARROW);
    // await io.homePage.clickByTextByIndex('Doc no.', 0);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DESCENDING);

    let docNo = (await io.homePage.getText(selectors.dashboardPagePO.DOC_NO_COLUMN)).toString();
    let docNoArray: string[] = docNo.split(',');

    let sorted = true
    for (let i = 0; i < docNoArray.length - 1; i++) {
      if (docNoArray[i] < docNoArray[i + 1]) {
        sorted = false;
      }
    }
    await io.assert.expectToBeTrue(sorted, 'Doc num column is not sorted in descending order');

  });
});
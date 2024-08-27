import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that EDI transactions can be filtered using multiple Direction values", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Epic-IO-89826 @Priority-P2 @Zephyr-IO-T37567 Verify that EDI transactions can be filtered using multiple Direction values", async ({ io, page }) => {

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
    await io.homePage.clickByText('Last 180 days');
    await io.homePage.clickByText('Apply');
    await io.homePage.loadingTime();

    //Get all available FA filter values
    await io.homePage.clickByTextByIndex("Direction", 0);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    let index1 = 0;//inbound
    let index2 = 1;//outbound
    let filters = (await io.homePage.getText(selectors.dashboardPagePO.FA_FILTER_VALUES)).toString();
    let filtersArray: string[] = filters.split(',');
    let filterApplied1 = filtersArray[index1];
    let filterApplied2 = filtersArray[index2];


    await io.homePage.clickByIndex(selectors.dashboardPagePO.FA_FILTER_CHECKBOX, index1);
    await io.homePage.clickByIndex(selectors.dashboardPagePO.FA_FILTER_CHECKBOX, index2);
    await io.homePage.clickByTextByIndex('Apply', 0);
    await io.homePage.loadingTime();

    let result = (await io.homePage.getText(selectors.dashboardPagePO.LAST_RUN)).toString();
    let resultArray: string[] = result.split(',');
    let numOfRows = resultArray.length;
    let filterWorking = true;
    for ( let i=0; i< numOfRows; i++){
      if(resultArray[i] != filterApplied1 && resultArray[i] != filterApplied2){
        filterWorking = false;
        break;
      }
    }
    await io.assert.expectToBeTrue(filterWorking, 'EDI documents are not filtered using Direction');
  });
});
import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify Combination of Filters on EDI dashboard", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Epic-IO-89826 @Priority-P2 @Zephyr-IO-T37639 Verify Combination of Filters on EDI dashboard", async ({ io, page }) => {

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

    await io.homePage.clickByTextByIndex("FA status", 0);
    // await io.homePage.clickByIndex(selectors.dashboardPagePO.FA_FILTER_BUTTON, 0);

    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    let index1 = 4;//Value=Not Applicable
    let index2 = 6;//Value=Rejected
    let filters = (await io.homePage.getText(selectors.dashboardPagePO.FA_FILTER_VALUES)).toString();
    let filtersArray: string[] = filters.split(',');
    let filterApplied1 = filtersArray[index1];
    let filterApplied2 = filtersArray[index2];


    await io.homePage.clickByIndex(selectors.dashboardPagePO.FA_FILTER_CHECKBOX, index1);
    await io.homePage.clickByIndex(selectors.dashboardPagePO.FA_FILTER_CHECKBOX, index2);
    await io.homePage.clickByTextByIndex('Apply', 0);
    await io.homePage.loadingTime();

    let result = (await io.homePage.getText(selectors.dashboardPagePO.FA_STATUS_COLUMN)).toString();
    let resultArray: string[] = result.split(',');
    let numOfRows = resultArray.length;
    let filterWorking = true;
    for ( let i=0; i< numOfRows; i++){
      if(resultArray[i] != filterApplied1 && resultArray[i] != filterApplied2){
        filterWorking = false;
        break;
      }
    }
    await io.assert.expectToBeTrue(filterWorking, 'EDI documents are not filtered using FA status');

    //Now apply doc type filter
    await io.homePage.clickByTextByIndex("Doc type", 0);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    let index = 1;//PO
    let filters2 = (await io.homePage.getText(selectors.dashboardPagePO.FA_FILTER_VALUES)).toString();
    let filtersArray2: string[] = filters2.split(',');
    let filterApplied = filtersArray2[index];

    await io.homePage.clickByIndex(selectors.dashboardPagePO.FA_FILTER_CHECKBOX, index);
    await io.homePage.clickByTextByIndex('Apply', 0);
    await io.homePage.loadingTime();

    let doctypeResult = (await io.homePage.getText(selectors.dashboardPagePO.FLOW_NAME)).toString();
    let doctypeResultArray: string[] = doctypeResult.split(',');

    let FAFilterResults = (await io.homePage.getText(selectors.dashboardPagePO.FA_STATUS_COLUMN)).toString();
    let FAArray: string[] = FAFilterResults.split(',');

    // Validate the results of final filter
    numOfRows = doctypeResultArray.length;
    let filterWorking1 = true;
    for ( let i=0; i< numOfRows; i++){
      if(doctypeResultArray[i] != filterApplied){
        filterWorking1 = false;
        break;
      }
    }
    numOfRows = FAArray.length;
    let filterWorking2 = true;
    for ( let i=0; i< numOfRows; i++){
      if(FAArray[i] != filterApplied1 && FAArray[i] != filterApplied2){
        filterWorking2 = false;
        break;
      }
    }
    await io.assert.expectToBeTrue(filterWorking1&&filterWorking2, 'Combination filters are not working on EDI dashboard');
  });
});
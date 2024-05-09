import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify Refresh feature on Completed EDI flows dashboard.", () => {
  test.beforeEach(async ({ io }) => {
  await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

  //search for the integration
  await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "EDI_RefreshTest_DND");
  await io.homePage.clickByTextByIndex('EDI_RefreshTest_DND', 0);

  //Initiate run
  await io.integrationPage.waitForElementAttached(selectors.basePagePO.RUNFLOW);
  await io.integrationPage.clickButtonByIndex(selectors.basePagePO.RUNFLOW, 0);
  await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.CANCEL_FLOW_RUN);
  });

  test("@Epic-IO-31713 @Priority-P2 @Zephyr-IO-T29016 @Zephyr-IO-T29026 Verify Refresh feature on Completed EDI flows dashboard.", async ({ io, page }) => {
    
    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED)

    //Open flows dashboard
    await io.homePage.clickByTextByIndex('Documents', 0);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FLOWS);
    await io.homePage.click(selectors.dashboardPagePO.FLOWS);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FILTER_BUTTON);

    await io.homePage.click(selectors.dashboardPagePO.REFRESH);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FILTER_BUTTON);

    //Last run values
    let dates = (await io.homePage.getText(selectors.dashboardPagePO.LAST_RUN)).toString();
    let datesArray: string[] = dates.split(',');

    //Get the oldest date from the list
    let latestRunDateString = datesArray.at(0);
    let latestRunDate = new Date(latestRunDateString);

    // Get the current date
    let currentDate = new Date();
    await io.homePage.addStep('@Zephyr-IO-T29016 - Verify that running flows are not shown on EDI dashboard');
    await io.assert.expectToBeTrue(latestRunDate < currentDate, 'Running flows are shown on flows dashboard');
    //get flow ID
    let flowID = await io.api.getFlowId('EDI_RefreshTest_Flow_DND');
    let resp = await io.api.verifyFlowStatusThroughAPI('EDI_RefreshTest_Flow_DND', flowID, [1,0,0]);
  
    //Refresh Page after run is complete
    await io.homePage.click(selectors.dashboardPagePO.REFRESH);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FILTER_BUTTON);

    //FLOW NAME
    let flows = (await io.homePage.getText('tbody > tr > td:nth-child(2)')).toString();
    let flowsArray: string[] = flows.split(',');
    let firstEntry = flowsArray.at(0);

    await io.assert.expectToBeValue('EDI_RefreshTest_Flow_DND', firstEntry, 'Page did not refresh');
     //Last run values
     dates = (await io.homePage.getText(selectors.dashboardPagePO.LAST_RUN)).toString();
     let datesArray2: string[] = dates.split(',');

     //Get the oldest date from the list
    let newtRunDateString = datesArray2.at(0);
    let newRunDate = new Date(newtRunDateString);
    
     await io.assert.expectToBeTrue((latestRunDate != newRunDate), 'Latest data is not fetched upon refresh')

  });
});
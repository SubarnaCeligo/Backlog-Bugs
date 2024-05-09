import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify Refresh feature on EDI Documents dashboard.", () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    //search for the integration
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "EDI_RefreshTest_DND");
    await io.homePage.clickByTextByIndex('EDI_RefreshTest_DND', 0);

    await io.integrationPage.waitForElementAttached('[data-test="runFlow"]');
    await io.integrationPage.clickButtonByIndex('[data-test="runFlow"]', 0);
    await io.integrationPage.waitForElementAttached('[data-test="cancelFlowRunIcon"]');
  });

  test.skip("@Epic-IO-31713 @Priority-P2 @Zephyr-IO-T29012 Refresh feature on EDI Documents dashboard.", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED)

    //Get current processed date
    let dates = (await io.homePage.getText(selectors.dashboardPagePO.DATA_PROCESSED_ON)).toString();
    let datesArrayBefore: string[] = dates.split(',');

    //Get the oldest date from the list
    let prevProcessedDateString = datesArrayBefore.at(0);
    let prevProcessedDate = new Date(prevProcessedDateString);

    //Wait for flow run to complete
    let flowID = await io.api.getFlowId('EDI_RefreshTest_Flow_DND');
    let resp = await io.api.verifyFlowStatusThroughAPI('EDI_RefreshTest_Flow_DND', flowID, [1, 0, 0]);

    //Refresh Page after run is complete
    await io.homePage.click(selectors.dashboardPagePO.REFRESH);
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.HELP_TEXT_ICON);

    //Get lastest proceesed date after refresh
    dates = (await io.homePage.getText(selectors.dashboardPagePO.DATA_PROCESSED_ON)).toString();
    let datesArrayAfter: string[] = dates.split(',');
  
    //Get the new date from the list
    let newtProcessedDateString = datesArrayAfter.at(0);
    let newProcessedDate = new Date(newtProcessedDateString);

    await io.assert.expectToBeTrue(newProcessedDate > prevProcessedDate, 'Latest data is not fetched after refresh' );

  });
});
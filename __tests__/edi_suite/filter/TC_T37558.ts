import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify filter tooling section is added on the EDI documents dashboard", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Epic-IO-89826 @Priority-P2 @Zephyr-IO-T37558 Verify filter tooling section is added on the EDI documents dashboard", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED)

    //Verify filter section
    await io.assert.expectToBeTrue(await io.flowBuilder.isVisible("text='Filter by'"),'Filter section is not added');
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.DOCTYPE_FILTER, 'Doc type filter is not added');  
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.FILETYPE_FILTER, 'file type filter is not added'); 
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.DIRECTION_FILTER, 'direction filter is not added');
    
    //Validate all available filter values
    await io.homePage.clickByTextByIndex("FA status", 0);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FILTER_VALUES);
    let list = (await io.homePage.getText(selectors.dashboardPagePO.FILTER_VALUES)).toString();
    await io.assert.expectToBeValue('Accepted,Accepted with Errors,Rejected,Failed,Not Applicable,In Progress,Not Received', list, 'All filter values are not shown');
    await io.homePage.clickByTextByIndex("FA status", 0);
    
    await io.homePage.click(selectors.dashboardPagePO.DOCTYPE_FILTER);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FILTER_VALUES);
    list = (await io.homePage.getText(selectors.dashboardPagePO.FILTER_VALUES)).toString();
    await io.assert.expectToBeValue('IN,PO', list, 'All filter values are not shown');
    await io.homePage.click(selectors.dashboardPagePO.DOCTYPE_FILTER);

    await io.homePage.click(selectors.dashboardPagePO.FILETYPE_FILTER);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FILTER_VALUES);
    list = (await io.homePage.getText(selectors.dashboardPagePO.FILTER_VALUES)).toString();
    await io.assert.expectToBeValue('X12,EDIFACT', list, 'All filter values are not shown');
    await io.homePage.click(selectors.dashboardPagePO.FILETYPE_FILTER);

    await io.homePage.click(selectors.dashboardPagePO.DIRECTION_FILTER);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FILTER_VALUES);
    list = (await io.homePage.getText(selectors.dashboardPagePO.FILTER_VALUES)).toString();
    await io.assert.expectToBeValue('Inbound,Outbound', list, 'All filter values are not shown');

  });
});
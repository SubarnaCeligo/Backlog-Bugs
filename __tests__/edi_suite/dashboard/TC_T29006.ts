import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify EDI dashboard when there is no EDI activity in the account", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-31713 @Priority-P2 @Zephyr-IO-T29006 Verify EDI dashboard when there is no EDI activity in the account", async ({ io, page }) => {

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
     await io.homePage.loadingTime();
 
     //filter for an integration
     await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FILTER_BUTTON);
     await io.homePage.clickByIndex(selectors.dashboardPagePO.FILTER_BUTTON, 0);
     await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
     await io.homePage.clickByTextByIndex("NO_EDI_Activity_DND", 0);
     await io.homePage.clickByText("Apply");
     await io.homePage.loadingTime();

     let message = await io.homePage.isVisible("text='No EDI activity to report.'");
     await io.assert.expectToBeTrue(message, 'Message was not shown.')

    
  });
});
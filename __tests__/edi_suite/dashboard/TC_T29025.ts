import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify default sorting on EDI Flows dashboard", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Epic-IO-31713 @Priority-P2 @Zephyr-IO-T29025 Verify default sorting on EDI Flows dashboard", async ({ io, page }) => {

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

   let defaultSortColumn =  (await io.homePage.getText(selectors.dashboardPagePO.SORTED_COLUMN)).toString();
   await io.assert.expectToContainValue('Last run', defaultSortColumn,'Data not sorted on Last run column');

    

  });
});
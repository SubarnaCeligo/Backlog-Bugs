import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that clicking on Integration name hyperlink navigates to integration page", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-31713 @Priority-P2 @Zephyr-IO-T29019 Verify that clicking on Integration name hyperlink navigates to integration page", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    
    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED, 'EDI dashboard did not load')

    //Open flows dashboard
    await io.homePage.clickByTextByIndex('Documents', 0);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FLOWS);
    await io.homePage.click(selectors.dashboardPagePO.FLOWS);
    await io.homePage.loadingTime();

    //filter for a flow
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FILTER_BUTTON);
    await io.homePage.clickByIndex(selectors.dashboardPagePO.FILTER_BUTTON, 1);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await page.locator(selectors.dashboardPagePO.DASHBOARD_INT_FLOW_FILTER_POPUP, { hasText: 'EDI_FLow_FilterTest_DND' }).click();
    // await io.homePage.clickByTextByIndex("EDI_FLow_FilterTest_DND", 0);
    await io.homePage.clickByText("Apply");
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FLOW_LINK);

    //FLOW NAME
    await io.homePage.clickByIndex(selectors.dashboardPagePO.FLOW_LINK, 0);
    await io.assert.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.FLOW_TOGGLE, 'Flow Builder page did not open');
  });
});
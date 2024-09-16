import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that clicking on error hyperlink on flows dashboard opens error console.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-31713 @Priority-P2 @Zephyr-IO-T29024 Verify that clicking on error hyperlink on flows dashboard opens error console.", async ({ io, page }) => {

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

    //filter for a flow with errors
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FILTER_BUTTON);
    await io.homePage.clickByIndex(selectors.dashboardPagePO.FILTER_BUTTON, 1);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await page.locator(selectors.dashboardPagePO.DASHBOARD_INT_FLOW_FILTER_POPUP, { hasText: 'EDI_FLow_FilterTest_DND' }).click();
    // await io.homePage.clickByTextByIndex("EDI_FLow_FilterTest_DND", 0);
    await io.homePage.clickByText("Apply");

    //Open errors hyperlink
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS, 0);

    //Verify if errors page is displayed
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPTEDITORHEADER);
    let pageHeader = (await io.homePage.getText(selectors.flowBuilderPagePO.SCRIPTEDITORHEADER)).toString();
    await io.assert.expectToContainValue("Errors:", pageHeader, 'Errors page did not open');
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.RESOLVE_JOBS,'Errors page did not open' );


  });
});
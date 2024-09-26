import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C28617_Verify dashboard data for standalone integration for EM 2.0", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(`${process.env["IO_UI_CONNECTOR_URL"]}integrations/none/flows`);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Zephyr-IO-T7453 @Env-All C28617_Verify dashboard data for standalone integration for EM 2.0 UI_Backlog", async ({ io, page }) => {
        await io.integrationPage.clickByText('Standalone flows')
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C12034_DND');
        await io.integrationPage.clickByText('TC_C12034_DND')
        await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
        await io.homePage.loadingTime()
        await io.homePage.loadingTime()
        //await page.waitForSelector(`${selectors.flowBuilderPagePO.IMPORT_RUN_COMPLETION_STATUS}:has-text("Completed")`);
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.DASHBOARD);
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.integrationPage.clickByText('Refresh')
        // Validating refresh data in completed flows
        await io.assert.verifyElementDisplayedByText('Completed date range:', "Refresh not done")

    });
});
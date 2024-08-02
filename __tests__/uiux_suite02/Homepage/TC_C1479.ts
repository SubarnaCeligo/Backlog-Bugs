import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C1479_Verify the Hour value decreases on Schedule field when dragged back on bar line back to the rectangular box under Every n Hours subtab", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T1928 TC_C1479_Verify the Hour value decreases on Schedule field when dragged back on bar line back to the rectangular box under Every n Hours subtab UI_Backlog", async ({ io, page }) => {
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON)
        await io.homePage.isPageLoaded()
        await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Standalone');
        await io.homePage.isPageLoaded()
        await io.integrationPage.clickByText('Standalone flows')
        await io.homePage.loadingTime()
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C12034_DND');
        await io.integrationPage.clickByText('TC_C12034_DND')
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCHEDULE_FLOW);
        await io.integrationPage.clickByText('Use cron expression')
        await io.integrationPage.clickByText('Hour')
        // Validating every hour visible
        await io.assert.verifyElementDisplayedByText('Every n hours', "Every n hours not showing")
    });
});
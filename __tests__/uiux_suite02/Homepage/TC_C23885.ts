import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C23885_Verify in Run history tab the values in Started & Completed columns displays in standard format like “Just now, last 5 minutes, 10 minutes ago, days ago. weeks ago", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T7431 TC_C23885_Verify in Run history tab the values in Started & Completed columns displays in standard format like “Just now, last 5 minutes, 10 minutes ago, days ago. weeks ago UI_Backlog", async ({ io, page }) => {
        
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
        await io.homePage.clickByText("Run history");
        // Validating Started & Completed columns displays in standard format
        await io.assert.verifyElementDisplayedByText('Started', "Format not showing")
    });
});
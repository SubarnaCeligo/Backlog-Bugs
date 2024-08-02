import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C23882_Verify the values in the Run history tab columns", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T7429 TC_C23882_Verify the values in the Run history tab columns UI_Backlog", async ({ io, page }) => {
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
        // Validating columns displays in the Run history tab
        await io.assert.verifyElementDisplayedByText('Duration', "Duration column not showing")
        await io.assert.verifyElementDisplayedByText('Ignored', "Ignored not showing")
        await io.assert.verifyElementDisplayedByText('Pages', "Pages not showing")
        await io.assert.verifyElementDisplayedByText('Actions', "Actions not showing")
        await io.assert.verifyElementDisplayedByText('Started', "Format not showing")
    });
});
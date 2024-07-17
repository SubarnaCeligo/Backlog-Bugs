import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C24202_Verify the Run history tab in different browsers", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T7440 TC_C24202_Verify the Run history tab in different browsers UI_Backlog", async ({ io, page }) => {
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
        await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
        // Validating run history visible
        await io.assert.verifyElementDisplayedByText('Run history', 'Run history not available')
    });
});
import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C19949_Verify: Success Graph: the tooltip displays: flow name, the total success count, the time coordinate", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T7299 TC_C19949_Verify: Success Graph: the tooltip displays: flow name, the total success count, the time coordinate UI_Backlog", async ({ io, page }) => {
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
        // Validating Success Graph,flow name, total success count, time coordinate visible
        await io.assert.verifyElementDisplayedByText('Duration', "Duration column not showing")
        await io.assert.verifyElementDisplayedByText('TC_C12034_DND', "flow name not showing")
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CHARTS)
        await io.assert.verifyElementDisplayedByText('Flow: Success', "Duration column not showing")
    });
});
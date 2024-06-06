import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C23880_Verify if the flow is not run is last 30+ days, then in Run history tab message should display: You don’t have any run history", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T7427 C23880_Verify if the flow is not run is last 30+ days, then in Run history tab message should display: You don’t have any run history UI_Backlog", async ({ io, page }) => {
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Automation Flows');
        await io.homePage.clickByText("Automation Flows");
        await io.flowBuilder.loadingTime();
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C23880_Flow_DND');
        await io.integrationPage.clickByText('TC_C23880_Flow_DND')
        await io.flowBuilder.loadingTime();
        await io.integrationPage.click(selectors.flowBuilderPagePO.RUN_HISTORY)
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText("You don't have any run history.", 'history page not opened')
    });
});
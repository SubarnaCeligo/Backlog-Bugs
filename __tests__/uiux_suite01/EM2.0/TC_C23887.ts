import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C23887_Verify the records are displayed in Run history are upto last 30 days", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T7313 C23887_Verify the records are displayed in Run history are upto last 30 days UI_Backlog", async ({ io, page }) => {
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
        await io.integrationPage.clickByText('Select range')
        await io.assert.verifyElementDisplayedByText("Last 30 days", 'history page not opened')
    });
});
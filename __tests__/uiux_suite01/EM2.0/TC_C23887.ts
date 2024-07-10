import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C23887_Verify the records are displayed in Run history are upto last 30 days", () => {
    test.beforeEach(async ({ io }) => {
        //Navigate to default integration
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    });
    test("@Env-All @Zephyr-IO-T7313 C23887_Verify the records are displayed in Run history are upto last 30 days UI_Backlog", async ({ io, page }) => {
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
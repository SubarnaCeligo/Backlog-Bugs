import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C26929_Verify Webhook pg ignored records should also be seen under line graphs in EM 2.0", () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    });
    test("@Env-All @Zephyr-IO-T7507 C26929_Verify Webhook pg ignored records should also be seen under line graphs in EM 2.0 UI_Backlog", async ({ io, page }) => {
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C26929_DND');
        await io.integrationPage.clickByText('TC_C26929_DND')
        // Validating Success Graph,flow name, total success count, time coordinate visible
        await io.assert.verifyElementDisplayedByText('Ignored', "Duration column not showing")
    });
});
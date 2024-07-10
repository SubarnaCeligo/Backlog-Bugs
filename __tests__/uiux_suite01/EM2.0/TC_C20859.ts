import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C20859_Verify Integration level shows the sum of the stat for all the enabled flows in the integration", () => {
    test.beforeEach(async ({ io }) => {
        //Navigate to default integration
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    });
    test("@Env-All @Zephyr-IO-T7402 C20859_Verify Integration level shows the sum of the stat for all the enabled flows in the integration UI_Backlog", async ({ io, page }) => {
        await io.integrationPage.waitForElementAttached(selectors.basePagePO.ANALYTICS_TAB);
        await io.integrationPage.click(selectors.basePagePO.ANALYTICS_TAB)
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText('Flow: Success', "Not showing")
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText('Average processing time/success record', "Not showing")
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText('Flow: Errors', "Not showing")
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText('Flow: Ignored', "Not showing")
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText('Flow: Resolved', "Not showing")
    });
});
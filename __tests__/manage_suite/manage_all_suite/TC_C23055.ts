import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C23055_Verify Account Renewal for Monitor or manage user", () => {
    test("@Env-All @Zephyr-IO-T1433 C23055_Verify Account Renewal for Monitor or manage user UI_Backlog", async ({ io,  page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Amazon Connector(Bharath)");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.homePage.clickByTextByIndex("Request to buy", 0);
        // Validating "licence" expired"
        await io.assert.verifyElementDisplayedByText('Request to buy subscription', 'Licence available')
    });
});
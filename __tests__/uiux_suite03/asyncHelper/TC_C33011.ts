import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C33011_To verify License is replaced with subscription for the renew/expired tile message", () => {
    test("@Env-All @Zephyr-IO-T3042 C33011_To verify License is replaced with subscription for the renew/expired tile message UI_Backlog @Env-All @Priority-P2", async ({ io,  page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Amazon Connector(Bharath)");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.homePage.clickByText("Request to buy");
        // Validating "licence" replaced by "subscription"
        await io.assert.verifyElementDisplayedByText('Request to buy subscription', 'Licence available')
    });
});
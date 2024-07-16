import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C42440_Verify changes to Renew button on IA tiles and confirmation messages", () => {
    test("@Env-All @Zephyr-IO-T918 C42440_Verify changes to Renew button on IA tiles and confirmation messages UI_Backlog @Env-All @Priority-P2", async ({ io,  page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Amazon Connector(Bharath)");
        await io.homePage.clickByText("Request to buy");
        // Validating "licence" replaced by "subscription"
        await io.assert.verifyElementDisplayedByText('Request to buy subscription', 'Licence available')
        await io.homePage.clickByText("Submit request");
        await io.assert.verifyElementDisplayedByText('Thanks for your request! We will be in touch soon. Check out our Marketplace to jumpstart your integrations with integration apps & templates.', 'Message not showing')


    });
});
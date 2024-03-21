
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C15857_Verify For OAuth connection Call back URL in the EU instance should be 'https://eu.integrator.io/connection/oauth2callback'_UI_Backlog", () => {
    test("TC_C15857_Verify For OAuth connection Call back URL in the EU instance should be 'https://eu.integrator.io/connection/oauth2callback'_UI_Backlog", async ({ io }, testInfo) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "iClients");
        await io.homePage.addStep("Reloading the page");
        await io.homePage.reloadPage();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.SEARCH, "TC_C15857_Iclient_DND");
        await io.homePage.clickByText("TC_C15857_Iclient_DND");
        // Validating callback URL visible
        await io.assert.verifyElementAttributeContainsText(selectors.dashboardPagePO.REDIRECT_URL, 'value', 'io/connection/oauth2callback')
    });
});


import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C56639_Verify the “+ create iClient” button allows the user to create a new iClient from the resources page when user has different access (admin,manage)", () => {
    test("@Env-All @Zephyr-IO-T16892 C56639_Verify the “+ create iClient” button allows the user to create a new iClient from the resources page when user has different access (admin,manage) UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "iClients");
        await io.homePage.addStep("Reloading the page");
        await io.homePage.reloadPage();
        await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C56641');
        // Validating custom oauth2.0 is visible
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.APPLICATION, "Custom OAuth2.0")
    });
});
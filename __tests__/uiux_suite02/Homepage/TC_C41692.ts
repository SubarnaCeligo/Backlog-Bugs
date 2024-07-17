import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C41692_Verify Buttons and hyperlinks present on Home screen/connections/imports/exports/agents/api tokens for empty state", () => {
    test("@Env-All @Zephyr-IO-T900 C41692_Verify Buttons and hyperlinks present on Home screen/connections/imports/exports/agents/api tokens for empty state UI_Backlog", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime()
        // Validating page showing correctly
        await io.assert.verifyElementDisplayedByText('My integrations', 'Page not showing')
        await io.homePage.goToMenu("Resources", "Connections");
        await io.homePage.loadingTime()
        // Validating app not crashed while clicked connections
        await io.assert.verifyElementDisplayedByText('Create connection', "App crashed")
        await io.homePage.goToMenu("Resources", "Exports");
        await io.homePage.loadingTime()
        // Validating app not crashed while clicked exports
        await io.assert.verifyElementDisplayedByText('Create export', "App crashed")
        await io.homePage.goToMenu("Resources", "Imports");
        await io.homePage.loadingTime()
        // Validating app not crashed while clicked imports
        await io.assert.verifyElementDisplayedByText('Create import', "App crashed")
        await io.homePage.goToMenu("Resources", "Agents");
        await io.homePage.loadingTime()
        // Validating app not crashed while clicked agents
        await io.assert.verifyElementDisplayedByText('Create agent', "App crashed")
        await io.homePage.goToMenu("Resources", "API tokens");
        await io.homePage.loadingTime()
        // Validating app not crashed while clicked tokens
        await io.assert.verifyElementDisplayedByText('Create API token', "App crashed")
    });
});

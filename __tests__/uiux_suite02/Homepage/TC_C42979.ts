import { test } from "@celigo/ui-core-automation";

test.describe("C42979_Elevate Brands - FBA Aggregator IO Account Slow changes & empty resources bug fix", () => {
    test("@Env-All @Zephyr-IO-T3090 C42979_Elevate Brands - FBA Aggregator IO Account Slow changes & empty resources bug fix UI_Backlog", async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.myAccountPage.loadingTime()
        await io.homePage.goToMenu("Resources", "Connections");
        // Validating app not crashed while clicked connections
        await io.assert.verifyElementDisplayedByText('Create connection', "App crashed")
        await io.homePage.goToMenu("Resources", "Exports");
        await io.myAccountPage.loadingTime()
        // Validating app not crashed while clicked exports
        await io.assert.verifyElementDisplayedByText('Create export', "App crashed")
        await io.homePage.goToMenu("Resources", "Imports");
        await io.myAccountPage.loadingTime()
        // Validating app not crashed while clicked imports
        await io.assert.verifyElementDisplayedByText('Create import', "App crashed")
        await io.homePage.goToMenu("Resources", "Agents");
        await io.myAccountPage.loadingTime()
        // Validating app not crashed while clicked agents
        await io.assert.verifyElementDisplayedByText('Create agent', "App crashed")
    });
});

import { test } from "@celigo/ui-core-automation";

test.describe("C41702_verify the images are loading properly if we transition from one page to another page", () => {
    test("@Env-All C41702_verify the images are loading properly if we transition from one page to another page UI_Backlog", async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
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
        await io.homePage.goToMenu("Resources","Recycle bin");
        await io.homePage.loadingTime()
        // Validating app not crashed while clicked recycle bin
        await io.assert.verifyElementDisplayedByText('Deleted date', "App crashed")
    });
});

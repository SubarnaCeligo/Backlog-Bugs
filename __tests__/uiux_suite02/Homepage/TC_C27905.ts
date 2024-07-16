import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27905_Verify App is not crashed when connection tab is opened in standalone flows", () => {
    test("@Env-All @Zephyr-IO-T4491 C27905_Verify App is not crashed when connection tab is opened in standalone flows UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.goToMenu("Resources", "Connections");
        await io.homePage.loadingTime()
        // Validating app not crashed while clicked connections
        await io.assert.verifyElementDisplayedByText('Create connection', "App crashed")
    });
});

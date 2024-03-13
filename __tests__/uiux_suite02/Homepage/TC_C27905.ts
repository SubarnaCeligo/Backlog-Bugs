import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip("C27905_Verify App is not crashed when connection tab is opened in standalone flows", () => {
    test("C27905_Verify App is not crashed when connection tab is opened in standalone flows", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.goToMenu("Resources", "Connections");
        // Validating app not crashed while clicked connections
        await io.assert.verifyElementDisplayedByText('Connections', "App crashed")
    });
});

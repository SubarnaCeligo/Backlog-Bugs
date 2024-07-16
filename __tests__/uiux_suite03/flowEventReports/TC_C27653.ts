import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27653_Verify all the drop down values in all over product must load fine", () => {
    test("@Env-All @Zephyr-IO-T2845 C27653_Verify all the drop down values in all over product must load fine UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Reports");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.clickByText('Choose integration');
        // Validating dropdown field should be opened
        await io.assert.verifyElementDisplayedByText("Standalone flows", "Dropdown not loaded");
    });
});

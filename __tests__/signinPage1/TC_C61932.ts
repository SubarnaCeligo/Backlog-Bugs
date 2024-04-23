import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C61932_App crash should not happen if we change IO url something like 'https://qa.staging.integrator.io///[https://qaprod.staging.integrator.io] ' based on the current environment", () => {
    test("@Env-All @Zephyr-IO-T2222 C61932_App crash should not happen if we change IO url something like 'https://qa.staging.integrator.io///[https://qaprod.staging.integrator.io] ' based on the current environment UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.homePagePO.TILE_VIEW);
        await page.goto('https://qaprod.staging.integrator.io');
        // Validating successfully navigated
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT, 'Sign in button is not displayed after sign out');
        await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.EMAIL, 'Email input is not displayed after sign out');
        await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.PASSWORD, 'Password input is not displayed after sign out');
    });
});

import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip("C61932_App crash should not happen if we change IO url something like 'https://qa.staging.integrator.io///[https://qaprod.staging.integrator.io] ' based on the current environment", () => {
    test("C61932_App crash should not happen if we change IO url something like 'https://qa.staging.integrator.io///[https://qaprod.staging.integrator.io] ' based on the current environment", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.homePagePO.TILE_VIEW);
        await page.goto('https://qaprod.staging.integrator.io');
        // Validating successfully navigated
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT, 'Sign in button is not displayed after sign out');
        await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.EMAIL_ID, 'Email input is not displayed after sign out');
        await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.PASSWORD_ID, 'Password input is not displayed after sign out');
    });
});

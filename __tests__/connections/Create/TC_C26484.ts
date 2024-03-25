
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C26484 GDrive - Verify 'PGP public key' field is mandatory when private key is not provided on connection", () => {
    test("C26484 GDrive - Verify 'PGP public key' field is mandatory when private key is not provided on connection", async ({ io, page }, testInfo) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "Connections");
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Google Drive');
        await page.keyboard.press('Enter');
        await io.flowBuilder.clickByText('Advanced');
        await io.flowBuilder.clickByText('Enable PGP cryptographic');
        await io.assert.verifyElementContainsText(selectors.connectionsPagePO.PGP_PUBLIC_KEY, 'PGP public key *');
        await io.assert.verifyElementContainsText(selectors.connectionsPagePO.PGP_PRIVATE_KEY, 'PGP private key *');
    });
});


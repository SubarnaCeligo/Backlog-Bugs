
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C26466 GDrive - Verify if 'Enable PGP cryptographic' checkbox is unchecked by default", () => {
    test("@Env-All C26466 GDrive - Verify if 'Enable PGP cryptographic' checkbox is unchecked by default", async ({ io, page }, testInfo) => {
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "Connections");
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Google Drive');
        await page.keyboard.press('Enter');
        await io.flowBuilder.clickByText('Advanced');
        await io.assert.verifyElementAttribute(`${selectors.flowBuilderPagePO.USE_PGP} input`, 'value', 'false');
    });
});


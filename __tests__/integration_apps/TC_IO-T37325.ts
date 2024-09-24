import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TEST from "@testData/integration_apps/T37325.json";

test.describe(`@Author_MaheshNivruttiSutar Verify that the ‘Test connection’ button UI is displayed properly while installing IA.`, () => {
    let connId; let iClientId;
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        //Fetch connector id
        connId = await io.api.getConnectorIdViaName("C55424_DND_I");
        TEST.license.email = process.env.IO_UserName;
        //Create license via API
        iClientId = await io.api.createConnectorLicenseViaId(connId, TEST.license);
    });

    test(`@Epic-IO-90427 @Priority-P2 @Env-All  @Zephyr-IO-T37325`, async ({ io, page }) => {
        await io.homePage.clickByText("Marketplace");
        await io.flowBuilder.loadingTime();
        await io.marketplacePage.fill(selectors.marketplacePagePO.SEARCH_MARKETPLACE, "C55424_DND_I");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickButtonByIndex(selectors.marketplacePagePO.INSTALL_CONNECTOR_PRODUCTION, 0);
        await io.flowBuilder.loadingTime();
        await io.loginPage.fill('[data-test="integrationTag"] input', "C55424_DND_I");
        await io.flowBuilder.click(selectors.basePagePO.INSTALL);
        await io.flowBuilder.loadingTime();
        await io.marketplacePage.fill(selectors.marketplacePagePO.SEARCH_INTEGRATION, "C55424_DND_I");
        await io.flowBuilder.loadingTime();
        await page
            .locator(selectors.homePagePO.INTEGRATION_TILES)
            .filter({ hasText: "Continue setup >" } && { hasText: "C55424_DND_IA" })
            .last()
            .locator("button")
            .first()
            .click();
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByIndex(
            selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON,
            0
        );
        //Disabled button
        const element = page.locator(selectors.flowBuilderPagePO.DIVIDER).nth(2);
        const margin = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin, "Test connection button not moved");

        //Enabled button
        await io.loginPage.fill('[data-test="ftp.hostURI"] input', "Test");
        const margin1 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin1, "Test connection button not moved");

        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.integrationPagePO.UNINSTALL);
        await io.flowBuilder.click(selectors.integrationPagePO.UNINSTALL_CONFIRM);

    });
});

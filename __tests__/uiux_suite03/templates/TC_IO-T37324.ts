import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`@Author_MaheshNivruttiSutar Verify that the ‘Test connection’ button UI is displayed properly while installing template.`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });

    test(`@Epic-IO-90427 @Priority-P2 @Env-QA @Zephyr-IO-T37324 Verify that the ‘Test connection’ button UI is displayed properly while installing template.`, async ({ io, page }) => {
        await io.homePage.clickByText("Marketplace");
        await io.flowBuilder.loadingTime();
        await io.marketplacePage.fill(selectors.marketplacePagePO.SEARCH_MARKETPLACE, "3PL Central - NetSuite" );
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickButtonByIndex(selectors.homePagePO.INSTALL_TEMPLATE, 0);
        await io.flowBuilder.loadingTime();
        await io.marketplacePage.clickByText("Install now");
        await io.marketplacePage.waitForElementAttached(
            selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
        );
        await io.homePage.clickByIndex(
            selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON,
            0
        );
        await io.homePage.clickByText("Use existing connection");
        await io.homePage.clickByText("Please select");
        let connMap = await io.api.loadConnections();
        var connId = connMap.get("3PL CONNECTION");
        await io.connectionPage.selectTextfromDropDown(page, connId)
        await io.connectionPage.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.loadingTime();

        await io.homePage.click(
            selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
        );
        await io.connectionPage.click(selectors.connectionsPagePO.NETSUITE_AUTH);
        await io.connectionPage.selectTextfromDropDown(page, "token");
        await io.flowBuilder.loadingTime();

        const element = page.locator(selectors.flowBuilderPagePO.DIVIDER).nth(2);
        const margin = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin, "Test connection button not moved");
    });
});

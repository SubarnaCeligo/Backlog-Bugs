import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T25986 Verify email field on changing the Server data source from netsuite2.com to netsuite.com", () => {
    test("@Zephyr-IO-T25986 @Env-All @Priority-P2 C94286 Verify email field on changing the Server data source from netsuite2.com to netsuite.com", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "Connections");
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'NetSuite JDBC');
        await page.keyboard.press('Enter');
        await io.flowBuilder.click(selectors.connectionsPagePO.JDBC_SERVER_DATA_SOURCE);
        await io.flowBuilder.selectTextfromDropDown(page, "NetSuite.com");
        expect(await io.flowBuilder.isVisible(selectors.connectionsPagePO.JDBC_EMAIL_INPUT)).toBeTruthy();
        await io.flowBuilder.click(selectors.connectionsPagePO.JDBC_SERVER_DATA_SOURCE);
        await io.flowBuilder.selectTextfromDropDown(page, "NetSuite2.com");
        expect(await io.flowBuilder.isVisible(selectors.connectionsPagePO.JDBC_EMAIL_INPUT)).toBeFalsy();
    });
});
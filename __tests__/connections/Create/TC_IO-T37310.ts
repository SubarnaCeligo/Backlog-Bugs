import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Connections/Create/T37310.json";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T37310 @Zephyr-IO-T37315 @Zephyr-IO-T37321", () => {
    test.afterEach(async ({ io }) => {
        await io.connections.deleteConnection(TC.name);
    });
    test.beforeEach(async ({ io }) => {
        await io.connections.createConnectionViaAPI(TC);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-90427 @Priority-P2 @Env-All @Zephyr-IO-T37310 @Zephyr-IO-T37321", async ({ io, page }) => {
        //IO-T37310 Verify Moved the "Test connection" button from left to next to the "Close" button on Edit connection page
        //IO-T37321 Verify that the ‘Test connection’ button UI is displayed properly when the ‘Save & Close’ button is not enabled from Edit connection page
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Resources", "Connections");
        await io.flowBuilder.loadingTime();
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, 'TC_IO-T37310 FTP CONNECTION');
        await io.flowBuilder.clickByTextByIndex('TC_IO-T37310 FTP CONNECTION', 0);
        await io.flowBuilder.loadingTime();

        //Disabled button
        const element = page.locator(selectors.flowBuilderPagePO.DIVIDER).nth(2);
        const margin = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin, "Test connection button not moved");

        //Enabled button
        await io.connectionPage.fill(selectors.basePagePO.FTP_PASSWORD, "test");
        const margin1 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin1, "Test connection button not moved");
    });
    test("@Epic-IO-90427 @Priority-P2 @Env-All @Zephyr-IO-T37315", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Resources", "Connections");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, '3PL');
        await io.connectionPage.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
        await io.flowBuilder.loadingTime();
        await io.connectionPage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.AUTHORIZATIONTYPE);
        await io.connectionPage.click(selectors.connectionsPagePO.BASIC);

        //Http form button
        const element = page.locator(selectors.flowBuilderPagePO.DIVIDER).nth(2);
        const margin1 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin1, "Test connection button not moved");

        //Simple form view
        await io.connectionPage.click(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        const margin11 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin11, "Test connection button not moved");
        await io.flowBuilder.addStep("*** verified UI is showing properly on connections where we have simple and http views  ***");

    });
});
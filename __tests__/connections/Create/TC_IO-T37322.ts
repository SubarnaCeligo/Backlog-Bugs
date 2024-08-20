import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T37322", () => {
    test.describe.configure({ retries: 2 })
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-90427 @Priority-P2 @Env-QA @Zephyr-IO-T37322 @crossbrowser Verify that the ‘Test connection’ button UI is displayed properly in different browsers.", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Resources", "Connections");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Postgre');
        await io.connectionPage.click(selectors.flowBuilderPagePO.POSTGRESQL_APPLICATION);
        await io.flowBuilder.loadingTime();
        //Disabled button
        const element = page.locator(selectors.flowBuilderPagePO.DIVIDER).nth(2);
        const margin = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin, "Test connection button not moved");
        //Enabled button
        await io.importsPage.fill(selectors.importPagePO.NAME_INPUT, "Postgre SQL CONNECTION");
        await io.flowBuilder.loadingTime();
        const margin1 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin1, "Test connection button not moved");
    });
    test("@Epic-IO-90427 @Priority-P2 @Env-QA @Zephyr-IO-T37314 Verify UI is showing properly on connections where we don't have 'Test connection' button", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Resources", "Connections");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'SALESFORCE');
        await io.connectionPage.click(selectors.flowBuilderPagePO.SF);
        await io.flowBuilder.loadingTime();
        const Symbol = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
        expect(await Symbol.screenshot()).toMatchSnapshot("IO-T37314.png", { maxDiffPixelRatio: 0.2 });
    });
});
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T5391 Verify handlebars guide link", () => {
    test("@Env-all @Priority-P2 @Zephyr-IO-T5391 C22838 Verify handlebars guide link", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'MYSQL');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MYSQL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'MYSQL CONNECTION');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByTextByIndex('MYSQL CONNECTION', 0);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.DATAURITEMPLATE, 1);
        await io.flowBuilder.loadingTime();
        const hyperlink = await page.getByRole('link', { name: 'Handlebars guide' }).getAttribute('href');
        await io.assert.expectToContainValue('https://docs.celigo.com/hc/en-us/articles/360039326071-Handlebars-helper-reference', hyperlink, 'Invalid hyperlink');
    });
});
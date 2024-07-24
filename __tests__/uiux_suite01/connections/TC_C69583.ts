import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C69583 Verify Walmart application Images will be updated properly`, () => {
    test(`@Env-All @Zephyr-IO-T18957 C69583 Verify Walmart application Images will be updated properly`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, "walmart");
        await page.keyboard.press('Enter');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.WALMART_US_IMAGE);
        const walmartUSImage = await page.$('[alt="walmart"]' )
        let src;
        src = await walmartUSImage?.getAttribute("src");
        expect(src).toContain("/walmart.png");
        await io.flowBuilder.click(selectors.connectionsPagePO.WALMART_CANADA_IMAGE);
        const walmartCAImage = await page.$('[alt="walmartcanada"]' )
        src = await walmartCAImage?.getAttribute("src");
        expect(src).toContain("/walmartcanada.png");
        await io.flowBuilder.click(selectors.connectionsPagePO.WALMART_MEXICO_IMAGE);
        const walmartMEImage = await page.$('[alt="walmartmexico"]' )
        src = await walmartMEImage?.getAttribute("src");
        expect(src).toContain("/walmartmexico.png");
    });
});
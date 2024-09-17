import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify The connection Search icon is not overflowing in the Firefox browser.", () => {
    test.describe.configure({ retries: 2 })
    test("@Bug-IO-87619 @Env-All @Priority-P2 @Zephyr-IO-T35692", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.homePage.loadingTime();

        const closeIc = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
        expect(await closeIc.screenshot()).toMatchSnapshot("Icon.png",  {maxDiffPixelRatio: 0.8 });
    });
});
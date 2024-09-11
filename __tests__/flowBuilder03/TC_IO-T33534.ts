import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '@testData/FlowBuilder/T33534.json';

test.describe("@Author_MaheshNivruttiSutar @Bug-IO-83426 @Env-QA @Priority-P2 @Zephyr-IO-T33534", () => {
    test.describe.configure({ retries: 2 })
    test("@Bug-IO-83426 @Env-All @Priority-P2 @Zephyr-IO-T33534", async ({ io, page }) => {
        const id = await io.createResourceFromAPI(TC, "FLOWS");
        await io.homePage.loadingTime();

        //Export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.CustomJson));
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        expect(await page.screenshot()).toMatchSnapshot("IO-T33534.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.CustomJson1));
        await io.homePage.loadingTime();
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.SAVE, 1);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.CustomJson));
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        expect(await page.screenshot()).toMatchSnapshot("IO-T33534.png", { maxDiffPixelRatio: 0.2 });
    });
});
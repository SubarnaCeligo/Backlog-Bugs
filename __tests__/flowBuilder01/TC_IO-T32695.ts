import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../testData/inputData/FlowBuilder/T32695.json';

test.describe("@Author_MaheshNivruttiSutar Verify user is able to update Custom setting for FTP import", () => {
    let id;
    test.describe.configure({ retries: 2 })
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(id);
    });
    test("@BUG-IO-83097 @Priority-P2 @Env-QA @Zephyr-IO-T32695", async ({ io, page }) => {
        id = await io.createResourceFromAPI(TC, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.flowBuilder.loadingTime();

        //Transfer
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.customSetting));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.SAVE,1);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.customSetting));
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.loadingTime();
        const Symbo = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
        expect(await Symbo.screenshot()).toMatchSnapshot("TC_IO=T32695.png",{maxDiffPixelRatio: 0.2});
    });
});
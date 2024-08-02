import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C119800 from '../../testData/inputData/FlowBuilder/C119800.json';
import TC from '../../testData/inputData/FlowBuilder/C119805.json';
import TC1 from '../../testData/inputData/FlowBuilder/C119797.json';

test.describe("TC_C119800_C119801", () => {
    let id;
    test.describe.configure({ retries: 1 })
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(id);
    });
    test("@Epic-IO-63762  @Priority-P2  @Zephyr-T24230 @Zephyr-T24231 @Env-All", async ({ io, page }) => {
        id = await io.createResourceFromAPI(C119800, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        //Listener
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LISTENER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.CustomJson));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        //-'Custom settings' should be renamed to 'Settings'.
        const Text = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text, "Settings name not shown");
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CONFIGREALEXPORT);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C119800-chromium-linux.png", { maxDiffPixelRatio: 0.2 });

        //C119801 'useAsPrimaryInterface' value as false
        //Listener
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC1.CustomJson));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        //No section should be hidden
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CONFIGREALEXPORT);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C119801-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    });
});
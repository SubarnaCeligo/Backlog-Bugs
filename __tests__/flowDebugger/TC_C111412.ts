import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111412 from "@testData/FlowDebugger/C111412.json";
import SCRIPT from "@testData/FlowDebugger/C115532_script.json"

test.describe('C111412', () => {
    let preMap; let id;
    test.beforeEach(async ({ io }) => {
        preMap = await io.api.createScriptViaAPI(SCRIPT.preMap);
    });
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowViaAPI(id);
        await io.api.deleteScriptViaAPI(preMap);
    });
    test('@Env-All @Zephyr-IO-T14380 C111412', async ({ io, page }) => {
        C111412.pageProcessors[0].qa__import.hooks.preMap._scriptId = preMap;
        id = await io.createResourceFromAPI(C111412, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_EXECUTION_LOG);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_SCRIPT);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 1);

        //1. Run now
        const runNow = await io.homePage.isVisible("text='Run now'")
        await io.assert.expectToBeValue(runNow.toString(), "false", "Run now is present");

        //2. Start debug
        const startDebug = await io.homePage.isVisible("text='Start debug'")
        await io.assert.expectToBeValue(startDebug.toString(), "false", "Start debug is present");

        //3. More
        const More = await io.homePage.isVisible("text='More'")
        await io.assert.expectToBeValue(More.toString(), "false", "More is present");

        //4. Rows
        const Rows = await io.homePage.isVisible("text='Rows'")
        await io.assert.expectToBeValue(Rows.toString(), "false", "Rows is present");

        //5. Custom time seting
        const time = await io.homePage.isVisible("text='Last 15 minutes'")
        await io.assert.expectToBeValue(time.toString(), "false", "Custom setting is present");
    });
});

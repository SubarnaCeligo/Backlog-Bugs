import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C115532 from "@testData/FlowDebugger/C115532.json";
import SCRIPT from "@testData/FlowDebugger/C115532_script.json"

test.describe('C115532_C115729', () => {
    let preMap; let postSubmit; let postMap; let filterScript; let id;
    test.beforeEach(async ({ io }) => {
        preMap = await io.api.createScriptViaAPI(SCRIPT.preMap);
        postSubmit = await io.api.createScriptViaAPI(SCRIPT.postSubmit);
        postMap = await io.api.createScriptViaAPI(SCRIPT.postMap);
        filterScript = await io.api.createScriptViaAPI(SCRIPT.script);
    });
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowViaAPI(id);
        await io.api.deleteScriptViaAPI(postSubmit);
        await io.api.deleteScriptViaAPI(postMap);
        await io.api.deleteScriptViaAPI(preMap);
        await io.api.deleteScriptViaAPI(filterScript);
    });
    test('@Env-All @Zephyr-IO-T14402 C115532_C115729', async ({ io, page }) => {
        C115532.pageProcessors[0].qa__import.hooks.preMap._scriptId = preMap;
        C115532.pageProcessors[0].qa__import.hooks.postMap._scriptId = postMap;
        C115532.pageProcessors[0].qa__import.hooks.postSubmit._scriptId = postSubmit;
        C115532.pageProcessors[0].qa__import.filter.script._scriptId = filterScript;

        id = await io.createResourceFromAPI(C115532, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_EXECUTION_LOG);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_SCRIPT);

        //TC_C115729 Verify Step name is showing for Input filter script
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 1);
        const text = await io.homePage.isVisible("text='filter'")
        await io.assert.expectToBeValue(text.toString(), 'true', "Filter is not working")

        //Post map script
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_SCRIPT);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 2);
        const text2 = await io.homePage.isVisible("text='postMap'")
        await io.assert.expectToBeValue(text2.toString(), 'true', "Filter is not working")

        //Post submit script
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_SCRIPT);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 3);
        const text3 = await io.homePage.isVisible("text='postSubmit'")
        await io.assert.expectToBeValue(text3.toString(), 'true', "Filter is not working")

        //Pre map script
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_SCRIPT);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 4);
        const text4 = await io.homePage.isVisible("text='preMap'")
        await io.assert.expectToBeValue(text4.toString(), 'true', "Filter is not working")

    });
});

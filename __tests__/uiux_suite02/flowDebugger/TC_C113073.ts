import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C113073 from "@testData/FlowDebugger/C113073.json"
import SCRIPT from "@testData/FlowDebugger/C115532_script.json"

test.describe('C113073', () => {
    let preMap; let postSubmit; let postMap; let id;
    test.beforeEach(async ({ io, page }) => {
        preMap = await io.api.createScriptViaAPI(SCRIPT.preMap);
        postSubmit = await io.api.createScriptViaAPI(SCRIPT.postSubmit);
        postMap = await io.api.createScriptViaAPI(SCRIPT.postMap);
    });
    test.afterEach(async ({ io, page }) => {
        // await io.api.deleteFlowViaAPI(id);
        await io.api.deleteScriptViaAPI(postSubmit);
        await io.api.deleteScriptViaAPI(postMap);
        await io.api.deleteScriptViaAPI(preMap);
    });
    test('@Env-All @Zephyr-IO-T14404 C113073', async ({ io, page }) => {
        C113073.pageProcessors[0].qa__import.hooks.preMap._scriptId = preMap;
        C113073.pageProcessors[0].qa__import.hooks.postMap._scriptId = postMap;
        C113073.pageProcessors[0].qa__import.hooks.postSubmit._scriptId = postSubmit;

        id = await io.createResourceFromAPI(C113073, "FLOWS");
        //Disable the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_EXECUTION_LOG);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_SCRIPT);

        //Post map script
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 1);
        const text = await io.homePage.isVisible("text='postMap'")
        await io.assert.expectToBeValue(text.toString(), 'true', "Value is not found")

        //Post submit script
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_SCRIPT);
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 2);
        const text1 = await io.homePage.isVisible("text='postSubmit'")
        await io.assert.expectToBeValue(text1.toString(), 'true', "Value is not found")

        //Pre map script
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_SCRIPT);
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 3);
        const text2 = await io.homePage.isVisible("text='preMap'")
        await io.assert.expectToBeValue(text2.toString(), 'true', "Value is not found")
    });
});

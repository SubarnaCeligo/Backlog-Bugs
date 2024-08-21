import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111388 from "@testData/FlowDebugger/C111388.json"

test.describe('C111388', () => {
    let filterScript; let id;
    test.beforeEach(async ({ io, page }) => {
        filterScript = await io.api.createScriptViaAPI(C111388.script);
    });
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(id);
        await io.api.deleteScriptViaAPI(filterScript);
    });
    test('@Env-All @Zephyr-IO-T14377 C111388', async ({ io, page }) => {
        C111388.pageProcessors[0].qa__import.filter.script._scriptId = filterScript;
        id = await io.createResourceFromAPI(C111388, "FLOWS");
        //Disable the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.JOB_ERRORS, 1);
        const text = await io.homePage.isVisible("text='TypeError: console.lo is not a function'")
        await io.assert.expectToBeValue(text.toString(), 'true', "Error is showing in run flow dashboard");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    });
});

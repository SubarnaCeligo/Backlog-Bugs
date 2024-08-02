import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C120351 from "@testData/FlowDebugger/C120351.json"
import SCRIPT from "@testData/FlowDebugger/C115532_script.json"

test.describe('C120351_C120693', () => {
   let postResponseMap; let flowId;
    test.beforeEach(async ({ io, page }) => {
        postResponseMap = await io.api.createScriptViaAPI(SCRIPT.postResponseMap);
    });
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(flowId);
        await io.api.deleteScriptViaAPI(postResponseMap);
    });
    test('@Env-All  @Zephyr-IO-T17980 C120351_C120693', async ({ io, page }) => {
        C120351.qa__api_tdata[0].createFlow.pageProcessors[0].hooks.postResponseMap._scriptId = postResponseMap;
        var flows = await io.api.createImpOrExpAndFlowsThruAPI(C120351);
        flowId = flows.get(C120351.name)["flowId"];
        await io.flowBuilder.navigateTo(
            process.env.IO_Integration_URL + "flowBuilder/" + flowId
        );
        await io.homePage.loadingTime()
        // Disable the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click()
        await io.homePage.loadingTime()
        await await page.waitForSelector(selectors.flowBuilderPagePO.JOB_ERRORS, {timeout:360000});

        //TC_C120693
        const element = await io.homePage.isVisible(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
        await io.assert.expectToBeValue(element.toString(), 'false', "Element is present")
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_EXECUTION_LOG);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_SCRIPT);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 1);
        const runNow = await io.homePage.isVisible("text='postResponseMap'")
        await io.assert.expectToBeValue(runNow.toString(), "true", "Execution log is not present");
    });
});

import { test, expect } from "@celigo/ui-core-automation";
import IO_T4959 from '@testData/FlowBuilder/IO_T4959.json';
import SCRIPT from "@testData/FlowDebugger/C115532_script.json"
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T28545", () => {
    let flowMap;
    let preMap;
    test.beforeEach(async ({ io, page  }) => {
        preMap = await io.api.createScriptViaAPI(SCRIPT.preMap);
    });
    test.afterEach(async ({ io, page  }) => {
        await io.api.deleteFlowViaAPI(flowMap.get(IO_T4959.qa__api_tdata[0].name)['flowId']);
        await io.api.deleteScriptViaAPI(preMap);
    });
    test("Verify the sentence case for each levels is in camel case @Zephyr-T28545 @Env-All @Priority-P2", async ({ 
        io, page
    }) => {
        //TC_T28545
        //Create a flow with NS export and HTTP import 
   
        IO_T4959.qa__api_tdata[0].pageProcessors[0].qa__import.hooks.preMap._scriptId = preMap;
        flowMap = await io.api.createImpOrExpAndFlowsThruAPI(IO_T4959, false);
        await io.flowBuilder.navigateTo(process.env.IO_Integration_URL + "flowBuilder/" + flowMap.get(IO_T4959.qa__api_tdata[0].name)['flowId']);

        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
        await io.assert.verifyElementDisplayedByText('SuiteScript hooks (NetSuite exports only)',"Element not displayed as expected");
        await io.assert.verifyElementDisplayedByText('File internal id',"Text not displayed in proper camel case");
    });
});
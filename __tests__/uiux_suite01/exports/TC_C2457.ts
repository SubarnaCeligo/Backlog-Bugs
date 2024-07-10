import { test, expect } from "@celigo/ui-core-automation";
import C2457 from '@testData/FlowBuilder/C2457.json';
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C2457", () => {
    let flowMap;
    test.afterEach(async ({ io, page  }) => {
        await io.api.deleteFlowViaAPI(flowMap.get(C2457.qa__api_tdata[0].name)['flowId']);
    });
    test("@Env-All Verify the fetching progress bar indicator is shown for listener logs and script logs", async ({ 
        io, page
    }) => { 
        flowMap = await io.api.createImpOrExpAndFlowsThruAPI(C2457, false);
        await io.flowBuilder.navigateTo(process.env.IO_Integration_URL + "flowBuilder/" + flowMap.get(C2457.qa__api_tdata[0].name)['flowId']);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);

        expect(await page.locator(selectors.flowBuilderPagePO.HOOK_TYPE_STACK_OPTION)).not.toBeVisible();
    });
});
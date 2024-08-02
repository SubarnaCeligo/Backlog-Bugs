import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C117288 from "@testData/FlowDebugger/C117288.json"

test.describe('C117288', () => {
    test('@Env-All @Zephyr-IO-T14412 C117288', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C117288, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PREVIEW_HTTP_RESPONSE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW_HTTP_RESPONSE);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RESPONSE_DATA_LINES);
        let label = await page.$$(selectors.flowBuilderPagePO.RESPONSE_DATA_LINES)
        var text = await label[1].textContent();
        await io.assert.expectToContainValue(`"users": [`, text, "Error is found");
    });
});

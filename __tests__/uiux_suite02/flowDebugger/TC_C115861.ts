import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C115861 from '../../../testData/inputData/FlowDebugger/C115861.json';


test.describe("C115861", () => {
    test("@Env-All C115861", async ({ io, page }) => {
        //Create a flow
        await io.createResourceFromAPI(C115861, "FLOWS");
        //Disable the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        //Clicking on Import
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.click(selectors.importPagePO.HTTP_RELATIVEURI);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_LINES);
        let label = await page.$$(selectors.flowBuilderPagePO.SCRIPT_DATA_LINES)
        var text = await label[1].textContent();
        await io.assert.expectToContainValue(`"record": {`, text, "Error is found");
    });
});
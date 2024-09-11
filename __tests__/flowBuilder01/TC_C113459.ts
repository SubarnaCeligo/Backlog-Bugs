import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C113459 from '../../testData/inputData/FlowBuilder/C113459.json';

test.describe("TC_C113459", () => {
    test("TC_C113459 @Env-All @Priority-P2 @Zephyr-IO-T8151", async ({ io, page }) => {
        //Create a flow
        await io.createResourceFromAPI(C113459, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        await io.assert.checkElementState(selectors.flowBuilderPagePO.FILTER_CONDITION,"isVisible");
    });
});
import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C113459 from '../../../testData/inputData/FlowBuilder/C113459.json';

test.describe("TC_C113459", () => {
    test("TC_C113459", async ({ io, page }) => {
        //Create a flow
        await io.createResourceFromAPI(C113459, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        let simpleToggle = await page.locator('[id="file.fileFilterConditions"]');
        let result = await simpleToggle.isVisible();
        await io.assert.expectToBeValue(result.toString(), "false", "Filter is not hidden");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    });
});
import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C112117 from '../../testData/inputData/FlowDebugger/C112117.json';

test.describe("C112117", () => {
    test("@Env-All @Zephyr-IO-T23768 C112117", async ({io, page}) => {
        await io.createResourceFromAPI(C112117, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);

        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
        await io.homePage.addStep('clicking on import');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        const element = await io.homePage.isVisible(selectors.basePagePO.ALIASES);
        await io.assert.expectToBeValue(element.toString(), 'false', "Element is not present")
    });
});
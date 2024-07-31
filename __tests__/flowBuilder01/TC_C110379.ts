import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C110379 from '../../testData/inputData/FlowBuilder/C110379.json';


test.describe("Validate the hover text of 'Enable flow' button on Flow Builder UI", () => {
  test("Validate the hover text of 'Enable flow' button on Flow Builder UI @Env-All @Priority-P2 @Zephyr-IO-T14101", async ({ io, page }) => {
    //Create a flow
    await io.createResourceFromAPI(C110379, "FLOWS");

    //Disable the flow
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    
    //Wait for flow to be disabled
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_BUTTON);

    //Hover on flow toggle
    await io.flowBuilder.hover(selectors.flowBuilderPagePO.FLOW_TOGGLE, 0, true);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP);

    //Get the hover text
    const hoverText = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP)).toString();

    //Validate hover text
    await io.assert.expectToContainValue('Your flow is disabled. Enable the flow to transfer',hoverText, 'Incorrect hover text' );
  });
});
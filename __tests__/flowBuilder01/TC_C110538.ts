import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C110682 from '../../testData/inputData/FlowBuilder/C110682.json';


test.describe("Verify that the mini map is hidden by default when a flow is opened", () => {
  test("Verify that the mini map is hidden by default when a flow is opened @Zephyr-IO-T13320 @Env-All @Priority-P2", async ({ io, page }) => {
    //Create a flow
    await io.createResourceFromAPI(C110682, "FLOWS");

    //Wait for the mini map controld to load 
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SHOW_HIDE_MAP);

    //Verify that the map is hidden by checking the label of map icon
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.FLOW_SHOW_MAP_LABEL, 'aria-label', "Show map"); 
    
  });
});
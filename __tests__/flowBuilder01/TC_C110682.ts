import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C110682 from '../../testData/inputData/FlowBuilder/C110682.json';


test.describe("Verify the positioning of map controls and the map on flow builder page", () => {
  test("Verify the positioning of map controls and the map on flow builder page @Zephyr-IO-T13321 @Env-All @Priority-P2", async ({ io, page }) => {
    //Create a flow
    await io.createResourceFromAPI(C110682, "FLOWS");

    //Wait for the mini map controld to load 
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SHOW_HIDE_MAP);

    //Click on Show Map
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SHOW_HIDE_MAP);

    //Verify the positioning of map controls and the map
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.MAP_CONTROLS, 'class', 'bottom left'); 
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.MINI_MAP, 'class', 'bottom left'); 
   
  });
});
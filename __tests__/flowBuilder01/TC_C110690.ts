import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C110690 from '../../testData/inputData/FlowBuilder/C110690.json';


test.describe("Verify that the map is hidden when hide map(X) icon is clicked.", () => {
  test("Verify that the map is hidden when hide map(X) icon is clicked. @Zephyr-IO-T13323 @Env-All @Priority-P2", async ({ io, page }) => {
    //Create a flow
    await io.createResourceFromAPI(C110690, "FLOWS");

    //Wait for the mini map controld to load 
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SHOW_HIDE_MAP);

    //Click on Show Map
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SHOW_HIDE_MAP);

    //Hover on the map
    await io.flowBuilder.hover(selectors.flowBuilderPagePO.MINI_MAP, 0, false);

    //Wait for X icon to appear and hover on it
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.HIDE_MAP_X_ICON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HIDE_MAP_X_ICON);
    
    // Verify that the map is hidden when X is clicked.
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.FLOW_SHOW_MAP_LABEL, 'aria-label', "Show map"); 
   
  });
});
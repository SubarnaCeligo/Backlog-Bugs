import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C110682 from '../../testData/inputData/FlowBuilder/C110682.json';


test.describe("Verify the the map icon in controls when the map is visible on the page and when the map is hidden.", () => {
    test("Verify the the map icon in controls when the map is visible on the page and when the map is hidden. @Zephyr-IO-T13324 @Env-All @Priority-P2", async ({ io, page }) => {
        //Create a flow
        await io.createResourceFromAPI(C110682, "FLOWS");
        
        //Wait for the mini map controld to load 
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SHOW_HIDE_MAP);

        // Verify the label of map icon on map controls when the map is hidden
        await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.FLOW_SHOW_MAP_LABEL, 'aria-label', "Show map");

        //Click on Show Map
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SHOW_HIDE_MAP);

        // Verify the label of map icon on map controls when the map visible on the screen
        await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.FLOW_SHOW_MAP_LABEL, 'aria-label', "Hide map");
        
    });
});
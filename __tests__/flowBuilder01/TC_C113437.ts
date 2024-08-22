import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111781 from '../../testData/inputData/FlowBuilder/C111781.json';


test.describe("Verify BETA label is not displayed for TEST MODE", () => {
    test("Verify BETA label is not displayed for TEST MODE @Env-All @Priority-P2 @Zephyr-IO-T25327", async ({ io, page }) => {
        //Create a flow 
        await io.createResourceFromAPI(C111781, "FLOWS");
      
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
     
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
     
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    

        //Wait for the flow to be disabled completely
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_ON_OFF);
    });
});
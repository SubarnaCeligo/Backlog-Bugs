import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C102846 from '../../testData/inputData/FlowDebugger/C102846.json';


test.describe("Verify if lookup has offline connection and no mock output data, then run test button is disabled.", () => {
    test("@Env-All @Zephyr-IO-T24090 Verify if lookup has offline connection and no mock output data, then run test button is disabled.", async ({io, page}) => {
        

        //Create a flow with a lookup that has an offline connection
        await io.createResourceFromAPI(C102846, "FLOWS");

        //Wait for flow toggle button to be visible
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);

        //Click on flow toggle button to disable the flow and accept the flow disable popup
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE); 
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
      
        //Wait for Run Test button to appear
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH);
        
        //Verify if both Run Test Buttons are in disabled state. 
        await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH, 'class','Mui-disabled');
        await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.RUNTEST_BUTTON_RUN_CONSOLE_XPATH, 'class','Mui-disabled');
  
    });
});
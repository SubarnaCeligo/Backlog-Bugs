import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C108203 from '../../../testData/inputData/FlowDebugger/C108203.json';


test.describe("Verify if a source has offline connection and no mock output data, then run test button is disabled.", () => {
    test("Verify if a source has offline connection and no mock output data, then run test button is disabled.", async ({io, page}) => {
        
        //Create a flow with offline connection
        await io.fillFormUI(C108203, "FLOWS");

        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);   
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
       

        //Wait for Run Test button to appear
        const runTestButtonOnTop = await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH);
        await runTestButtonOnTop.waitFor();
    
        //Verify if both Run Test Buttons are in disabled state. 
        const isDisabled =  (await io.assert.checkElementState(selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH, 'isDisabled')) && (await io.assert.checkElementState(selectors.flowBuilderPagePO.RUNTEST_BUTTON_RUN_CONSOLE_XPATH, 'isDisabled'));
        await io.assert.expectToBeTrue(isDisabled,'Run Test button is not disabled.');
 
       
        
    });
});
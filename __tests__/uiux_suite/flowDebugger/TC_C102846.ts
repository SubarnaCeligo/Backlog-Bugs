import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C102846 from '../../../testData/inputData/FlowDebugger/C102846.json';


test.describe("Verify if lookup has offline connection and no mock output data, then run test button is disabled.", () => {
    test("Verify if lookup has offline connection and no mock output data, then run test button is disabled.", async ({io, page}) => {
        

        //Create a flow with a lookup that has an offline connection
        await io.fillFormUI(C102846, "FLOWS");

        //Wait for flow toggle button to be visible
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);

        //Click on flow toggle button to disable the flow and accept the flow disable popup
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE); 
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);

        //Wait for Run Test button to appear
        // const runTestButtonOnTop = await page.locator('[data-test="runTest"]').first();
        const runTestButtonOnTop = await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH);
        await runTestButtonOnTop.waitFor();

        //Get the run test button on run console
        const runTestButtonRunConsole = await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON_RUN_CONSOLE_XPATH);
       
        //Verify if both Run Test Buttons are in disabled state. 
        const isDisabled =  (await io.assert.checkElementState(selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH, 'isDisabled')) && (await io.assert.checkElementState(selectors.flowBuilderPagePO.RUNTEST_BUTTON_RUN_CONSOLE_XPATH, 'isDisabled'));
        await io.assert.expectToBeTrue(isDisabled,'Run Test button is not disabled.');

    });
});
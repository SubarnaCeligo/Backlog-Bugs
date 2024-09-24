import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111309 from '../../testData/inputData/FlowBuilder/C111309.json';


test.describe("C111309_C111390_Verify that flow deletion is not allowed for enabled flows on Flow Builder page", () => {
  test("Verify that flow deletion is not allowed for enabled flows on Flow Builder page @Zephyr-IO-T13327 @Env-All @Priority-P2", async ({ io, page }) => {
    //Create a flow 
    await io.createResourceFromAPI(C111309, "FLOWS");

    //Wait for the flow to load
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_ON_OFF);

    //Open actions menu
    await io.flowBuilder.clickButtonByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 0);
    
    //Check if Delete flow button is disabled
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DELETE_FLOW);
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.DELETE_FLOW,'class','Mui-disabled');

    //Hover on the disabled 'Delete flow' button
    await io.flowBuilder.hover(selectors.flowBuilderPagePO.DELETE_FLOW, 0, true);

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP);
    const hoverText = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP)).toString();

    //Validate the hover text
    await io.assert.expectToContainValue('Only disabled flows can be deleted.', hoverText, 'Invalid/No hover text');
    
   
  });
});
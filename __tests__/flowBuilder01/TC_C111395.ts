import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111395 from '../../testData/inputData/FlowBuilder/C111395.json';


test.describe("Verify that flow deletion is not allowed for enabled running flows on Flow Builder page", () => {
    test("Verify that flow deletion is not allowed for enabled running flows on Flow Builder page @Zephyr-IO-T14102 @Env-All @Priority-P2", async ({ io, page }) => {
        //Create a flow 
        await io.createResourceFromAPI(C111395, "FLOWS");

        //Wait for the flow to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);

        //Run the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);

        //Open actions menu
        await io.flowBuilder.clickButtonByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 0);
        
        //Check if Delete flow button is disabled
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DELETE_FLOW);
        await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.DELETE_FLOW, 'class', 'Mui-disabled');

        //Hover on the disabled 'Delete flow' button
        await io.flowBuilder.hover(selectors.flowBuilderPagePO.DELETE_FLOW, 0, true);

        //Get the hover text
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP);
        const hoverText = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP)).toString();

        //Validate the hover text
        await io.assert.expectToContainValue('Only disabled flows can be deleted.', hoverText, 'Invalid/No hover text');



    });
});
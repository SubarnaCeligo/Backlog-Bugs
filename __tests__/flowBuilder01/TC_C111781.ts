import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111781 from '../../testData/inputData/FlowBuilder/C111781.json';


test.describe("Verify that a disabled flow cannot be deleted from Flow Builder page when test run is in progress", () => {
    test("Verify that a disabled flow cannot be deleted from Flow Builder page when test run is in progress @Env-All @Priority-P2 @Zephyr-IO-T10104", async ({ io, page }) => {
        //Create a flow 
        await io.createResourceFromAPI(C111781, "FLOWS");

        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);

        //Wait for the flow to be disabled completely
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_ON_OFF);

        //Initiate test run
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.RUNTEST_BUTTON, 0);

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
        await io.assert.expectToContainValue('A flow cannot be deleted while a test run is in progress.', hoverText, 'Invalid/No hover text');



    });
});
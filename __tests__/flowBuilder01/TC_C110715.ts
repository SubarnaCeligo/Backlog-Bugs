import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C110715 from '../../testData/inputData/FlowBuilder/C110715.json';


test.describe("Verify the contents of delete confirmation dialog when a disabled flow is being deleted from Flow Builder page.", () => {
    test("Verify the contents of delete confirmation dialog when a disabled flow is being deleted from Flow Builder page. @Env-All @Priority-P2 @Zephyr-IO-T13326", async ({ io, page }) => {
        //Create a flow with multiple exports and offline connections
        await io.createResourceFromAPI(C110715, "FLOWS");

        //Wait for flow toggle button to be visible
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);

        //Click on flow toggle button to disable the flow and accept the flow disable popup
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);

        //Wait for the flow to be disabled completely
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_ON_OFF);

        //Click on actions menu
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 0);

        //wait for menu to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DELETE_FLOW);

        //Click on delete
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
        
        //Validate dialog contents
        await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
        await io.assert.verifyElementText(selectors.integrationPagePO.DELETE_CONF_DIALOG_CONTENTS, "This flow will be placed in your account’s recycle bin where it will be subject to purging based on your account’s data retention period.");

    });
});
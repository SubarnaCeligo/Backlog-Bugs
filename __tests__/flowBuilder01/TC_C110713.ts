import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C110715 from '../../testData/inputData/FlowBuilder/C110715.json';


test.describe("Verify the contents of delete confirmation dialog when a disabled flow is being deleted from Integration Builder page.", () => {
    test("Verify the contents of delete confirmation dialog when a disabled flow is being deleted from Integration Builder page. @Env-All @Priority-P2 @Zephyr-IO-T13325", async ({ io, page }) => {
        //Create a flow with multiple exports and offline connections
        await io.createResourceFromAPI(C110715, "FLOWS");

        //Wait for flow toggle button to be visible
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);

        //Click on flow toggle button to disable the flow and accept the flow disable popup
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);

        //Navigate to Integration page
        io.flowBuilder.clickByText('Automation Flows');
  
        //Search for the flow
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,'Delete dialog contents test');
        await io.integrationPage.delay(2000); // wait for the search to complete
        await io.flowBuilder.clickByText('Last updated');
        //Open ACtions menu
        await io.integrationPage.clickButtonByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 1);
    
        //Wait to delete flow button to appaer and click on it
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.DELETE_FLOW);
        await io.integrationPage.click(selectors.integrationPagePO.DELETE_FLOW);

         //Validate dialog contents
        await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
        await io.assert.verifyElementText(selectors.integrationPagePO.DELETE_CONF_DIALOG_CONTENTS, "This flow will be placed in your account’s recycle bin where it will be subject to purging based on your account’s data retention period.");
   
    });
});
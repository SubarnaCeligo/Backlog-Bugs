import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C112004 from '../../testData/inputData/FlowBuilder/C112004.json';


test.describe("Verify that a flow cannot be disabled from Integration page while it is still running", () => {
    test("Verify that a flow cannot be disabled from Integration page while it is still running @Env-All @Priority-P2 @Zephyr-IO-T14111", async ({ io, page }) => {
        //Create a flow 
        await io.createResourceFromAPI(C112004, "FLOWS");

        //Wait for the flow to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
      
        //Navigate to Integration page
        io.flowBuilder.clickByText('Automation Flows');

        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Disable Running Flow - Integration UI');
        await io.integrationPage.delay(2000); // wait for the search to complete

        //Run the flow
        await io.integrationPage.clickButtonByIndex(selectors.flowBuilderPagePO.RUN_FLOW,0);

        //Open actions menu for the load
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.CANCEL_FLOW_RUN);

        //Hover on the disabled button
        await io.integrationPage.hover(selectors.flowBuilderPagePO.FLOW_TOGGLE, 0, true);

        //Get the hover text
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP);
        const hoverText = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP)).toString();

        //Validate the hover text
        await io.assert.expectToContainValue('Flow cannot be disabled while flow run is in progress.', hoverText, 'Invalid/No hover text');

    });
});
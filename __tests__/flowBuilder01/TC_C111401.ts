import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111401 from '../../testData/inputData/FlowBuilder/C111401.json';


test.describe("Verify that flow deletion is not allowed for enabled running flows on a specific Integration page", () => {
    test("Verify that flow deletion is not allowed for enabled running flows on a specific Integration page @Zephyr-IO-T14103 @Env-All @Priority-P2", async ({ io, page }) => {
        //Create a flow 
        await io.createResourceFromAPI(C111401, "FLOWS");

        //Wait for the flow to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);

        //Navigate to Integration page
        io.flowBuilder.clickByText('Automation Flows');
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Delete Running Flow - Integration UI');
        await io.integrationPage.delay(2000); // wait for the search to complete

        //Run the flow
        await io.integrationPage.clickButtonByIndex(selectors.flowBuilderPagePO.RUN_FLOW,0);

        //Open actions menu for the load
        await io.integrationPage.clickButtonByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 1);
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.DELETE_FLOW);

        // Verify if Delet flow button is disabled
        await io.assert.verifyElementAttributeContainsText(selectors.integrationPagePO.DELETE_FLOW, 'class', 'Mui-disabled');

        //Hover on the disabled button
        await io.integrationPage.hover(selectors.integrationPagePO.DELETE_FLOW, 0, true);

        //Get the hover text
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP);
        const hoverText = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP)).toString();

        //Validate the hover text
        await io.assert.expectToContainValue('Only disabled flows can be deleted.', hoverText, 'Invalid/No hover text');

    });
});
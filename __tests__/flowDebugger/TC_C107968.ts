import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C107968 from '../../testData/inputData/FlowDebugger/C107968.json';
import C107968_MultipleSource from '../../testData/inputData/FlowDebugger/C107968_MultipleSource.json';

test.describe("Validate the Run confirmation dialog title when a flow step has offline connections", () => {
    test("@Env-All @Zephyr-IO-T24093 Validate the Run confirmation dialog title when a flow steps has offline connections", async ({io, page}) => {
        //Create a flow with offiline connection and wait for the integration to load
        await io.createResourceFromAPI(C107968, "FLOWS");

        //Wait for Run Flow button to appear and Click 
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);

        const dialog = selectors.myAccountPagePO.DIALOG_BOX;
        // Wait for Run Confirmation dialog to appear
        await io.myAccountPage.waitForElementAttached(dialog);

        //Validate the dialog title
        const dialogTitle = (await io.flowBuilder.getText("h2")).toString();
        await io.assert.expectToContainValue('Confirm run with offline connections', dialogTitle, 'Dialog title is incorrect')

        //Validate the dialog contents.
        const dialogContents = (await io.flowBuilder.getText("p")).toString();
        await io.assert.expectToContainValue('Are you sure you want to run this flow?,One or more steps have offline connections and will not be completed.,Bring your connections online to ensure completion of all steps.', dialogContents, 'Dialog contents are incorrect')

    });
    test("@Env-All Bug#IO-48090-Validate the Run confirmation dialog from Run Source dropdown when a flow steps has offline connections", async ({ io, page }) => {
        //Create a flow containg multiple sources with offiline connections and wait for the integration to load
        await io.createResourceFromAPI(C107968_MultipleSource, "FLOWS");

        //Wait for Run Flow button to appear and Click on chevron to expand run specific source dropdwon
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SELECT_PAGE_GENERATOR_POPPER);

        //Click on Run flow
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.RUN_FLOW, 2);

        const dialog = selectors.myAccountPagePO.DIALOG_BOX;
        // Wait for Run Confirmation dialog to appear
        await io.myAccountPage.waitForElementAttached(dialog);

        //Validate the dialog title
        const dialogTitle = (await io.flowBuilder.getText("h2")).toString();
        await io.assert.expectToContainValue('Confirm run with offline connections', dialogTitle, 'Dialog title is incorrect')

        //Validate the dialog contents.
        const dialogContents = (await io.flowBuilder.getText("p")).toString();
        await io.assert.expectToContainValue('Are you sure you want to run this flow?,One or more steps have offline connections and will not be completed.,Bring your connections online to ensure completion of all steps.', dialogContents, 'Dialog contents are incorrect')

    });
});
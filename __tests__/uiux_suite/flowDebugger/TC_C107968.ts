import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C107968 from '../../../testData/inputData/FlowDebugger/C107968.json';


test.describe("Validate the Run confirmation dialog title when a flow step has offline connections", () => {
    test("Validate the Run confirmation dialog title when a flow steps has offline connections", async ({io, page}) => {
        //Create a flow with offiline connection and wait for the integration to load
        await io.createResourceFromAPI(C107968, "FLOWS");

        const runFlowButtonOnTop = await page.locator(selectors.flowBuilderPagePO.RUN_FLOW);

        //Wait for Run Flow button to appear and Click 
        await runFlowButtonOnTop.waitFor();
        await runFlowButtonOnTop.click();

        const dialog = selectors.myAccountPagePO.DIALOG_BOX;
        // Wait for Run Confirmation dialog to appear
        await io.myAccountPage.waitForElementAttached(dialog);

        //Validate the dialog title
        const dialogTitle = await page.locator("h2").textContent();
        expect (dialogTitle).toBe('Confirm run with offline connections');


         //Validate the dialog contents.
        const dialogContents = await page.locator("p").allTextContents();
        const containsContents = (dialogContents.includes('Are you sure you want to run this flow?') && dialogContents.includes('One or more steps have offline connections and will not be completed.') && dialogContents.includes('Bring your connections online to ensure completion of all steps.'));
        await io.assert.expectToBeTrue(containsContents, "Dialog contents are incorrect");

        
        
    });
});
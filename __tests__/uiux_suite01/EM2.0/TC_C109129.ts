import { test, expect } from "@celigo/ui-core-automation";
import testdata from "../../../testData/inputData/EM2.0/T19797.json";
import { randomNumber } from "@celigo/aut-utilities";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_T19777_T19804 Verify by hovering over the error row and also Verify by hovering over the error row in the ""New View"" by navigating from the Current View`, () => {
    let flowId;
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowViaAPI(flowId);
    });

    test(`@Zephyr-IO-T19777_T19804 @Env-All T19777_T19804 Verify by hovering over the error row and also Verify by hovering over the error row in the ""New View"" by navigating from the Current View`, async ({
        io,
        page
    }) => {
        // Create a flow
        testdata.name = testdata.name + randomNumber();
        flowId = await io.createResourceFromAPI(testdata, "FLOWS");

        //Wait for flow run to complete
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
        await io.integrationPage.clickButtonByIndex(selectors.basePagePO.RUNFLOW, 0);
        let flowID = await io.api.getFlowId(testdata.name);
        await io.api.verifyFlowStatusThroughAPI(
            "EDI_RefreshTest_Flow_DND",
            flowID,
            [4, 0, 0]
        );
        await io.flowBuilder.loadingTime();

        // Open more actions menu on the run console
        await io.flowBuilder.clickByIndex(
            selectors.integrationPagePO.OPENACTIONSMENU,
            1
        );

        // Check if the "Download files" option is displayed
        await io.assert.verifyElementDisplayedByText("Download files", "Download files option is missing");    
    });
});

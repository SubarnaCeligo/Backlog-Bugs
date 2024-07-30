import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T3825 from "@testData/monitorSuite/T3825.json"
import testData from "@testData/monitorSuite/monitor_all_Ci_user.json";

test.describe("T3825 To verify formula textbox field is disabled for the users who has monitor access", () => {
    let errorFlowId
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(errorFlowId)
    });

    test("@Zephyr-IO-T3825 @Env-All To verify formula textbox field is disabled for the users who has monitor access", async ({ io, page }) => {
        // Create a flow
        const pa = await io.api.processAshareData(testData);
        errorFlowId = await io.createResourceFromAPI(T3825, "FLOWS");
        await io.homePage.loadingTime()

        // Open the Netsuite export
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.EXPORT, 0);

        // Open Additional Search Criteria
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADDITIONAL_SEARCHCRITERIAB);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADDITIONAL_SEARCHCRITERIAB);
        
        // Check if Formula field is disabled
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADDITIONAL_SEARCHCRITERIAF0);
        await io.assert.verifyElementAttributeContainsText(`${selectors.flowBuilderPagePO.ADDITIONAL_SEARCHCRITERIAF0} div`, 'class', 'Mui-disabled');
    });
});

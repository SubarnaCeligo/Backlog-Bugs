import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C116958 from "@testData/FlowDebugger/C116958.json"

test.describe('C116958', () => {
    test('@Env-All @Zephyr-IO-T214408 C116958', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C116958, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        // await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click()
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);

        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS, "Import Debug logs for the test run is not displayed");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        const testRunLogs = await io.homePage.isVisible(selectors.flowBuilderPagePO.TEST_RUN_STATUS);
        await io.assert.expectToBeTrue(testRunLogs, "No import message not shown");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DEBUG_LOGS);
        const debugLog = await io.homePage.isVisible("text='You don’t have any debug log entries.'");
        await io.assert.expectToBeTrue(debugLog, "No import message not shown");
    });
});

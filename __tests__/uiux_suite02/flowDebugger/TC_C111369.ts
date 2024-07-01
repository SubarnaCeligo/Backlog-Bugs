import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111369 from "@testData/FlowDebugger/C111369.json";
import C113428 from "@testData/FlowDebugger/C113428.json";

test.describe('C111369_C113428', () => {
    test('@Env-All @Zephyr-IO-T14388 C111369', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C111369, "FLOWS");
        //Disable the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS, "Debug logs for the test run is not displayed");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.HTTP_REQUEST, "HTTP request not displayed");
        const errorStatus = (await io.importsPage.getText(selectors.flowBuilderPagePO.TEST_RUN_STATUS)).toString();
        await io.assert.expectToContainValue("404", errorStatus, 'Error is not showing');

    });
    test('@Env-All @Zephyr-IO-T14409 C113428 Debug log must be captured for Blob lookups.', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C113428, "FLOWS");
        //Disable the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS, "Debug logs for the test run is not displayed");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_STATUS, "Debug log must be captured for Blob lookups is not displayed");
    });
});

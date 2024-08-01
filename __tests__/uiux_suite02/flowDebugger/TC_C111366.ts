import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111366 from "@testData/FlowDebugger/C111366.json"

test.describe('C111366', () => {
    test('@Env-All @Zephyr-IO-T14385 C111366', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C111366, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_LOG);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.homePage.loadingTime()
        await io.homePage.isPageLoaded()
        await io.homePage.isPageReady()
        const lastRun = page.getByText('Last run');
        await lastRun.waitFor({ state: 'visible', timeout: 900000 });

        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.homePage.loadingTime()
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);

        //TC_C111366 Users should be able to access test run debug logs in addition to the debug logs related to live calls made to the application.
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TEST_RUN_STATUS);
        const dropdown = await page.$$(selectors.flowBuilderPagePO.TEST_RUN_STATUS);
        var dropdownLength = await dropdown.length
        await io.assert.expectToBeTrue(dropdownLength >= 1, "Production logs are not showing");

        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TEST_RUN_STATUS);
        const dropdown1 = await page.$$(selectors.flowBuilderPagePO.TEST_RUN_STATUS);
        var dropdownLength1 = await dropdown1.length
        await io.assert.expectToBeTrue(dropdownLength1 >= 1, "Test run logs are not showing");
        await io.homePage.addStep("Verified User is able to access test run debug logs in addition to the debug logs related to live calls made to the application.");
    });
});

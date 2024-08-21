import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111373 from "@testData/FlowDebugger/C111373.json"

test.describe('C111373_C111374', () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      });

    test('@Env-All @Zephyr-IO-T14391 @Zephyr-IO-T14392 C111373_C111374', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C111373, "FLOWS");
        await io.homePage.loadingTime()
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        //Disable the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);

        //TC_C111373 Verify for listener When mock output is present, users is able to access the debug logs.
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LISTENER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS, "Debug logs for the test run is not displayed");
        //HTTP request
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.HTTP_REQUEST, "HTTP request not displayed");

        //Body
        await io.assert.verifyElementDisplayedByText('Body', 'Body field not found');
        //Headers
        await io.assert.verifyElementDisplayedByText('Headers', 'Headers field not found');
        //Other
        await io.assert.verifyElementDisplayedByText('Other', 'Other field not found');

        //HTTP response
        await io.flowBuilder.clickButtonByIndex(selectors.exportsPagePO.HTTP_RESPONSE, 1);
        await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.HTTP_RESPONSE, "HTTP response is not displayed");
        //Body
        await io.assert.verifyElementDisplayedByText('Body', 'Body field not found');
        //Headers
        await io.assert.verifyElementDisplayedByText('Headers', 'Headers field not found');
        //Other
        await io.assert.verifyElementDisplayedByText('Other', 'Other field not found');

        //TC_C111374 Verify for listener user should able to filter debug log by using filters
        //Response code filter
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.DEBUG_LOG_FILTER, 2);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FILTER_OPTION, 3);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATERANGE_APPLY);
        const text1 = await io.homePage.isVisible("text='You don’t have any debug log entries.'")
        await io.assert.expectToBeValue(text1.toString(), 'true', "Filter is not working")
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_LOG);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    });
});

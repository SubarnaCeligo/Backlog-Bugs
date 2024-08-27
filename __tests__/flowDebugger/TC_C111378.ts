import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111378 from "@testData/FlowDebugger/C111378.json"
import C111377 from "@testData/FlowDebugger/C111377.json"
import C111376 from "@testData/FlowDebugger/C111376.json"
import C111375 from "@testData/FlowDebugger/C111375.json"

test.describe('C111378_C111377_C111376_C111375', () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test('@Env-All @Zephyr-IO-T14396 C111378', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C111378, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        // await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click()
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);

        //users should be able to access the relevant debug logs.
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS, "Debug logs for the test run is not displayed");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        //HTTP request
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.HTTP_REQUEST, "HTTP request not displayed");
        //Wait for logs to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DEBUG_LOGS_BODY);
        //Body
        await io.assert.verifyElementDisplayedByText('Body', 'Body field not found');
        //Headers
        await io.assert.verifyElementDisplayedByText('Headers', 'Headers field not found');
        //Other
        await io.assert.verifyElementDisplayedByText('Other', 'Other field not found');

        //HTTP response
        await io.flowBuilder.clickButtonByIndex(selectors.exportsPagePO.HTTP_RESPONSE, 1);
        await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.HTTP_RESPONSE, "HTTP response is not displayed");
        //Wait for logs to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DEBUG_LOGS_BODY);
        //Body
        await io.assert.verifyElementDisplayedByText('Body', 'Body field not found');
        //Headers
        await io.assert.verifyElementDisplayedByText('Headers', 'Headers field not found');
        //Other
        await io.assert.verifyElementDisplayedByText('Other', 'Other field not found');

    });
    test('@Env-All @Zephyr-IO-T14395 C111377', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C111377, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        // await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click()
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);

        //users should be able to access the relevant debug logs.
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS, "Debug logs for the test run is not displayed");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        //HTTP request
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.HTTP_REQUEST, "HTTP request not displayed");
        //Wait for logs to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DEBUG_LOGS_BODY);
        //Body
        await io.assert.verifyElementDisplayedByText('Body', 'Body field not found');
        //Headers
        await io.assert.verifyElementDisplayedByText('Headers', 'Headers field not found');
        //Other
        await io.assert.verifyElementDisplayedByText('Other', 'Other field not found');

        //HTTP response
        await io.flowBuilder.clickButtonByIndex(selectors.exportsPagePO.HTTP_RESPONSE, 1);
        await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.HTTP_RESPONSE, "HTTP response is not displayed");
        //Wait for logs to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DEBUG_LOGS_BODY);
        //Body
        await io.assert.verifyElementDisplayedByText('Body', 'Body field not found');
        //Headers
        await io.assert.verifyElementDisplayedByText('Headers', 'Headers field not found');
        //Other
        await io.assert.verifyElementDisplayedByText('Other', 'Other field not found');
    });
    test('@Env-All @Zephyr-IO-T14394 C111376', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C111376, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        // await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click()
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);

        //users should be able to access the relevant debug logs.
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS, "Debug logs for the test run is not displayed");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        //HTTP request
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.HTTP_REQUEST, "HTTP request not displayed");
        //Wait for logs to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DEBUG_LOGS_BODY);
        //Body
        await io.assert.verifyElementDisplayedByText('Body', 'Body field not found');
        //Headers
        await io.assert.verifyElementDisplayedByText('Headers', 'Headers field not found');
        //Other
        await io.assert.verifyElementDisplayedByText('Other', 'Other field not found');

        //HTTP response
        await io.flowBuilder.clickButtonByIndex(selectors.exportsPagePO.HTTP_RESPONSE, 1);
        await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.HTTP_RESPONSE, "HTTP response is not displayed");
        //Wait for logs to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DEBUG_LOGS_BODY);
        //Body
        await io.assert.verifyElementDisplayedByText('Body', 'Body field not found');
        //Headers
        await io.assert.verifyElementDisplayedByText('Headers', 'Headers field not found');
        //Other
        await io.assert.verifyElementDisplayedByText('Other', 'Other field not found');

    });
    test('@Env-All @Zephyr-IO-T14393 C111375', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C111375, "FLOWS");
        //Disable the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        // await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click()
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        //Lookup
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        //users should be able to view multiple lines (equivalent to the number of records received from the export) under the test run debug logs
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS, "Debug logs for the test run is not displayed");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TEST_RUN_STATUS);
        const dropdown = await page.$$(selectors.flowBuilderPagePO.TEST_RUN_STATUS);
        var dropdownLength = await dropdown.length
        await io.assert.expectToBeValue("8", dropdownLength.toString(), "All script are not showing");

        //HTTP request
        // await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.HTTP_REQUEST, "HTTP request not displayed");
        //Wait for logs to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DEBUG_LOGS_BODY);
        //Body
        await io.assert.verifyElementDisplayedByText('Body', 'Body field not found');
        //Headers
        await io.assert.verifyElementDisplayedByText('Headers', 'Headers field not found');
        //Other
        await io.assert.verifyElementDisplayedByText('Other', 'Other field not found');

        //HTTP response
        await io.flowBuilder.clickButtonByIndex(selectors.exportsPagePO.HTTP_RESPONSE, 1);
        await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.HTTP_RESPONSE, "HTTP response is not displayed");
        //Wait for logs to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DEBUG_LOGS_BODY);
        //Body
        await io.assert.verifyElementDisplayedByText('Body', 'Body field not found');
        //Headers
        await io.assert.verifyElementDisplayedByText('Headers', 'Headers field not found');
        //Other
        await io.assert.verifyElementDisplayedByText('Other', 'Other field not found');
    });
});

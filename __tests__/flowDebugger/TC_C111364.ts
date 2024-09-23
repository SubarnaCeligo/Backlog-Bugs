import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111364 from "@testData/FlowDebugger/C111364.json"

test.describe('C111364_C111365_C111367_C111368_C111370', () => {
    test('@Env-All @Zephyr-IO-T14383 C111364_C111365_C111367_C111368_C111370', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C111364, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click();
        await io.homePage.loadingTime()
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);

        //TC_C111364 Users should be able to view the debug logs for the test run.
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.EXPORT, 0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS, "Debug logs for the test run is not displayed");

        //TC_C111365 Verify Separate sections are provided to differentiate between live calls and test run logs.
        const Symbol = await page.$(selectors.flowBuilderPagePO.SECTION);
        await Symbol.waitForElementState("stable")
        expect(await Symbol.screenshot()).toMatchSnapshot("SeparateSection.png", {threshold: 0.1});
        await io.homePage.addStep('Verified Separate sections should be provided to differentiate between live calls and test run logs.');
        const debugLogs = (await io.importsPage.getText(selectors.flowBuilderPagePO.DEBUG_LOGS)).toString();
        await io.assert.expectToContainValue("Debug logs", debugLogs, 'Label not showing');
        const testRunDebugLogs = (await io.importsPage.getText(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS)).toString();
        await io.assert.expectToContainValue("Test run debug logs", testRunDebugLogs, 'Label not showing');

        //TC_C111368 Verify for export If mock output is not present, live call is made to the application and user should be able to view the relevant debug logs
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

        //TC_C111370 Verify for export user should able to filter debug log by using filters
        //Method filter
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.HTTP_REQUEST);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DEBUG_LOG_FILTER);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.DEBUG_LOG_FILTER, 2);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FILTER_OPTION, 2);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATERANGE_APPLY);
        const text = await io.homePage.isVisible("text='You don’t have any debug log entries.'")
        await io.assert.expectToBeValue(text.toString(), 'true', "Filter is not working")
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DEBUG_LOG_FILTER);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.DEBUG_LOG_FILTER, 2);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FILTER_OPTION, 0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATERANGE_APPLY);

        //Response code filter
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DEBUG_LOG_FILTER);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.DEBUG_LOG_FILTER, 2);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FILTER_OPTION, 3);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATERANGE_APPLY);
        const text1 = await io.homePage.isVisible("text='You don’t have any debug log entries.'")
        await io.assert.expectToBeValue(text1.toString(), 'true', "Filter is not working")
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_LOG);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
       
        //TC_C111367 Verify for export If mock output is available, users are able to access test run debug logs.
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN);
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.RUNTEST_BUTTON, 3);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MAP_ZOOM_TO_FIT);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.EXPORT, 1);
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
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.HTTP_RESPONSE, "HTTP response is not displayed");
        //Body
        await io.assert.verifyElementDisplayedByText('Body', 'Body field not found');
        //Headers
        await io.assert.verifyElementDisplayedByText('Headers', 'Headers field not found');
        //Other
        await io.assert.verifyElementDisplayedByText('Other', 'Other field not found');

        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_LOG);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    });
});

import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111381 from "@testData/FlowDebugger/C111381.json"

test.describe('C111379_C111380_C111381_C116756', () => {
    test('@Env-All @Zephyr-IO-T14397 C111379_C111380_C111381_C116756', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C111381, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await page.getByText("Completed").nth(1).waitFor({ state: "visible", timeout:360000 });
        let testRunRunningLonger = await io.flowBuilder.isVisible(selectors.basePagePO.CLOSE_BUTTON);
        if (testRunRunningLonger){
            await io.flowBuilder.click(selectors.basePagePO.CLOSE_BUTTON);
        }
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);

        //TC_C111379 Verify for import Users should be able to view test run debug logs
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS, "Import Debug logs for the test run is not displayed");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);


        //TC_C111380 Verify for import The number of rows displayed depends on the set batch size.
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TEST_RUN_STATUS);
        const dropdown = await page.$$(selectors.flowBuilderPagePO.TEST_RUN_STATUS);
        var dropdownLength = await dropdown.length
        await io.assert.expectToBeValue("4", dropdownLength.toString(), "Rows are not displaying as per batch size");

        //TC_C111381 If a mock response is available for a given debug log, users should be able to view the 'HTTP Request' and 'HTTP Response' tabs. Within the 'HTTP Request' tab, users should be able to examine the body, headers, and other relevant details.
        //HTTP request
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.HTTP_REQUEST, "HTTP request not displayed");
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.HTTP_REQUEST);
        let requestTabs = await io.flowBuilder.getText('[role="tablist"]');
        console.log(requestTabs);
        // //Body
        // await io.assert.verifyElementTextByIndex("[id*='body']", 'Body', 3);
        // //Headers
        // await io.assert.verifyElementTextByIndex("[id*='headers']", 'Headers', 2);
        // //Other
        // await io.assert.verifyElementTextByIndex("[id*='others']", "Other", 1);
        await io.assert.expectToBeValueInArray(requestTabs, 'BodyHeadersOther', 'Tabs are not displayed')
        var actual = await io.connectionPage.getText(
            selectors.flowBuilderPagePO.CONTENT
        );
        await io.assert.expectToContainValue('\"{  \\\"id\\\": \\\"44207\\\",  \\\"recordType\\\": \\\"account\\\",  \\\"Name\\\": \\\"0Account 1\\\",  \\\"Display Name\\\": \\\"10.0 0Account 1\\\",  \\\"Account Type\\\": \\\"Bank\\\"}\"', JSON.stringify(actual), 'Record is not same');
        

        //HTTP response
        await page.pause();
        await io.flowBuilder.clickButtonByIndex(selectors.exportsPagePO.HTTP_RESPONSE, 1);
        await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.HTTP_RESPONSE, "HTTP response is not displayed");
        // //Body
        // await io.assert.verifyElementTextByIndex("[id*='body']", 'Body', 3);
        // //Headers
        // await io.assert.verifyElementTextByIndex("[id*='headers']", 'Headers', 2);
        // //Other
        // await io.assert.verifyElementTextByIndex("[id*='others']", "Other", 1);
        let responseTabs = await io.flowBuilder.getText('[role="tablist"]');
        console.log(requestTabs);
        await io.assert.expectToBeValueInArray(responseTabs, 'BodyHeadersOther', 'Tabs are not displayed')
        //TC_C116756 Verify For import debug log records are not populating properly
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TEST_RUN_STATUS, 1);
        var actual1 = await io.connectionPage.getText(
            selectors.flowBuilderPagePO.CONTENT
        );
        await io.assert.expectToContainValue('\"{  \\\"id\\\": \\\"656\\\",  \\\"recordType\\\": \\\"account\\\",  \\\"Name\\\": \\\"Automation_DH\\\",  \\\"Display Name\\\": \\\"12345678 Automation_DH\\\",  \\\"Account Type\\\": \\\"Bank\\\"}\"', JSON.stringify(actual1), 'Record is not same');
    });
});

import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111387 from "@testData/FlowDebugger/C111387.json"
import SCRIPT from "@testData/FlowDebugger/C115532_script.json"

test.describe('C111383_C111384_C111385_C111386_C111387_C111408_C111409', () => {
    let preMap; let postSubmit; let postMap; let filterScript; let id; let preSavePage;
    let transform;let outputFilter;
    test.beforeEach(async ({ io, page  }) => {
        preSavePage = await io.api.createScriptViaAPI(SCRIPT.preSavePage);
        transform = await io.api.createScriptViaAPI(SCRIPT.transform);
        outputFilter = await io.api.createScriptViaAPI(SCRIPT.outputFilter);
        preMap = await io.api.createScriptViaAPI(SCRIPT.preMap);
        postSubmit = await io.api.createScriptViaAPI(SCRIPT.postSubmit);
        postMap = await io.api.createScriptViaAPI(SCRIPT.postMap);
        filterScript = await io.api.createScriptViaAPI(SCRIPT.script);
    });
    test.afterEach(async ({ io, page  }) => {
        await io.api.deleteFlowViaAPI(id);
        await io.api.deleteScriptViaAPI(preSavePage);
        await io.api.deleteScriptViaAPI(transform);
        await io.api.deleteScriptViaAPI(outputFilter);
        await io.api.deleteScriptViaAPI(postSubmit);
        await io.api.deleteScriptViaAPI(postMap);
        await io.api.deleteScriptViaAPI(preMap);
        await io.api.deleteScriptViaAPI(filterScript);
    });
    test('@Env-All @Zephyr-IO-T14372 C111383_C111384_C111385_C111386_C111387_C111408_C111409', async ({ io, page }) => {
        C111387.pageGenerators[0].qa__export.hooks.preSavePage._scriptId = preSavePage;
        C111387.pageGenerators[0].qa__export.transform.script._scriptId = transform;
        C111387.pageGenerators[0].qa__export.filter.script._scriptId = outputFilter;
        C111387.pageProcessors[0].qa__import.hooks.preMap._scriptId = preMap;
        C111387.pageProcessors[0].qa__import.hooks.postMap._scriptId = postMap;
        C111387.pageProcessors[0].qa__import.hooks.postSubmit._scriptId = postSubmit;
        C111387.pageProcessors[0].qa__import.filter.script._scriptId = filterScript;

        id = await io.createResourceFromAPI(C111387, "FLOWS");
        //Disable the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.loadingTime();
        await page.getByText("Completed").nth(1).waitFor({ state: "visible", timeout:360000 });
        let testRunRunningLonger = await io.flowBuilder.isVisible(selectors.basePagePO.CLOSE_BUTTON);
        if (testRunRunningLonger){
            await io.flowBuilder.click(selectors.basePagePO.CLOSE_BUTTON);
        }
        // await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);

        //TC_C111383 Users should be able to access execution logs for scripts in test run mode without the need to activate the debugger.
        //TC_C111387 User should be able to see all logs in test mode
        const executionLog = await io.homePage.isVisible(selectors.flowBuilderPagePO.TEST_RUN_EXECUTION_LOG);
        await io.assert.expectToBeTrue(executionLog, "Execution logs for scripts in test run not visible");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_EXECUTION_LOG);


        //TC_C111408 Verify Execution log tab in run console after running flow in test mode
        //Script tab
        const script = await page.$(selectors.flowBuilderPagePO.SELECT_SCRIPT);
        const status = await script.isEditable();
        await io.assert.expectToBeTrue(status, "Script field is not enabled");

        //Step tab
        const step = await page.$(selectors.flowBuilderPagePO.STEP);
        const status1 = await step.isDisabled();
        await io.assert.expectToBeTrue(status1, "Step field is not disabled");

        //Function type tab
        const functionType = await page.$(selectors.flowBuilderPagePO.STEP);
        const status2 = await functionType.isDisabled();
        await io.assert.expectToBeTrue(status2, "Function type tab is not disabled");

        //Log level tab
        const logLevel = await page.$(selectors.flowBuilderPagePO.STEP);
        const status3 = await logLevel.isDisabled();
        await io.assert.expectToBeTrue(status3, "Log level tab is not disabled");

        //"Select a script to view it's log" text should show
        const text = await io.homePage.isVisible("text='Select a script to view its logs.'")
        await io.assert.expectToBeValue(text.toString(), 'true', "Value is not found")


        // All scripts should show in the dropdown
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_SCRIPT);
        const dropdown = await page.$$(selectors.flowBuilderPagePO.FLOWS_LIST);
        var dropdownLength = await dropdown.length
        await io.assert.expectToBeValue("8", dropdownLength.toString(), "All script are not showing");
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FLOWS_LIST, 6);


        //TC_C111385 Users should be able to refresh the logs.
        //TC_C111409 Verify Execution log tab in run console after choosing any script from script dropdown
        //TC_C111384 Users should be able to apply filters to the execution logs based on the step, function type, and log level.
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.REFRESH_RESOURCE);

        //The "Script", "Step", "Function type", and "Log level" buttons should be enabled.
        //Script tab
        const script1 = await page.$(selectors.flowBuilderPagePO.SELECT_SCRIPT);
        const status5 = await script1.isEditable();
        await io.assert.expectToBeTrue(status5, "Script field is not enabled");

        //Step tab
        const step1 = await page.$(selectors.flowBuilderPagePO.STEP);
        const status6 = await step1.isEditable();
        await io.assert.expectToBeTrue(status6, "Step field is not enabled");

        //Function type tab
        const functionType1 = await page.$(selectors.flowBuilderPagePO.STEP);
        const status7 = await functionType1.isEditable();
        await io.assert.expectToBeTrue(status7, "Function type tab is not enabled");

        //Log level tab
        const logLevel1 = await page.$(selectors.flowBuilderPagePO.STEP);
        const status9 = await logLevel1.isEditable();
        await io.assert.expectToBeTrue(status9, "Log level tab is not enabled");

        //The user should be able to apply "Step", "Function type", and "Log level" filters
        //Step filter
        await io.flowBuilder.click(selectors.flowBuilderPagePO.STEP);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FILTER_OPTION, 0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATERANGE_APPLY);

        //Function type
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FUNCTION_TYPE);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FLOWS_LIST, 2);
        const text1 = await io.homePage.isVisible("text='No logs to show.'")
        await io.assert.expectToBeValue(text1.toString(), 'true', "Filter is not working")
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FUNCTION_TYPE);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FLOWS_LIST, 1);
        const text2 = await io.homePage.isVisible("text='Pre save page script'")
        await io.assert.expectToBeValue(text2.toString(), 'true', "Filter is not working")

        //Log level
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOG_LEVEL);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FLOWS_LIST, 1);
        const text3 = await io.homePage.isVisible("text='No logs to show.'")
        await io.assert.expectToBeValue(text3.toString(), 'true', "Filter is not working")

        //TC_C111386 User not able to see logs
        await io.flowBuilder.reloadPage();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.AUDIT_LOGS);
        const elementa = await io.homePage.isVisible(selectors.flowBuilderPagePO.TEST_RUN_EXECUTION_LOG);
        await io.assert.expectToBeValue(elementa.toString(), 'false', "Element is present")

    });
});

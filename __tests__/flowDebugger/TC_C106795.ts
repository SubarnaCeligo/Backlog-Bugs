import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C106795.json";

test.describe("TC_C106795_C106798_C107016", () => {
  let script_id;
  test.beforeEach(async ({ io }) => {
    test.step("*** Go to flows page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteScriptViaAPI(script_id);
    test.step("*** Deleting the script files ***", async () => { });
  });
  test("@Env-All @Zephyr-IO-T23757 TC_C106795_C106798_C107016", async ({ io, page }) => {
    script_id = await io.api.createScriptViaAPI(TC.script);
    TC.qa__api_tdata[0].pageProcessors[0].qa__import.hooks.preMap._scriptId =
      script_id;
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => { }
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC.name)["flowId"]);
    test.step("*** Opening the flow ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    test.step("*** Clicking on disable flow ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    test.step("*** Clicking on confirm disable ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN,
      0
    );
    test.step("*** Clicking on dropdown icon ***", async () => { });
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.MUI_PAPEER_ROUNDED_MUILISTITEMROOT,
      1
    );
    test.step("*** Selecting the second source ***", async () => { });

    //TC_C106798 Verify when a source is selected and the flow is enabled, preview is showing the first source data in flow steps.
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.INPUT_FILTER,
      0
    );
    test.step("*** Clicking on input filter ***", async () => { });
    //Fetching input filter data test.beforeEach enabling flow
    await io.homePage.loadingTime();
    var firstFilter = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    //TC_C106795 Verify Flow is running fine in test mode with selected source having input filter, output filter, hooks, transformation, mapping configuration
    //TC_C107016 Verify enabled run not get impacted due to preview changes.
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      0
    );
    await io.homePage.loadingTime();
    test.step("*** Running flow in test mode ***", async () => { });
    let status = await page.$$(selectors.flowBuilderPagePO.JOB_ERRORS);
    for (let i = 0; i < status.length; i++) {
      let message = await status[i].textContent();
      await io.assert.expectToBeValue(String(message), "Success", "");
    }
    test.step("*** Verified flow is running successfully ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);
    test.step("*** Clicking on hook ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.PREMAPSCRIPT,
      5
    );
    test.step("*** Clicking on 'Test run results' link ***", async () => { });
    await io.homePage.loadingTime();

    let pageCol = await page.$$(selectors.flowBuilderPagePO.AFE_RECORD_COLUMN);
    let statusCol = await page.$$(
      selectors.flowBuilderPagePO.AFE_TRACE_KEY_COLUMN
    );
    for (let i = 0; i < pageCol.length; i++) {
      let cell = await (await pageCol[i]).textContent();
      let cellValue = `Page ${i + 1}`;
      await io.assert.expectToBeValue(String(cell), cellValue, "");
    }
    for (let i = 0; i < statusCol.length; i++) {
      let cell = await (await statusCol[i]).textContent();
      await io.assert.expectToBeValue(String(cell), "Success", "");
    }
    test.step("*** Verified Flow is running successfully and all records pass till the last step with respect to the input filter, output filter, hooks, transformation, and mapping configuration. ***", async () => { });
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 0);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    test.step("*** Clicking on enable flow ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
    test.step("*** Clicking on confirm enable ***", async () => { });
    await io.homePage.loadingTime();
    // await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    //Fetching input filter data test.afterEach enabling flow
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.INPUT_FILTER,
      0
    );
    test.step("*** Clicking on input filter ***", async () => { });
    await io.homePage.loadingTime();
    var firstFilter1 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    console.log("rrfrfrf", firstFilter);
    console.log("rrfrfrfdd", firstFilter1);
    await expect(firstFilter).not.toEqual(firstFilter1);
    test.step("*** Verified For enabled flow by default first source data should be shown in the flow steps. ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await waitForCompletionStatus(page, selectors);
    async function waitForCompletionStatus(page, selectors) {
      const completedStatusSelector = `${selectors.flowBuilderPagePO.IMPORT_RUN_COMPLETION_STATUS}:has-text("Completed")`;
      const completedStatusElement = await page.waitForSelector(completedStatusSelector, { timeout: 60000 }).catch(() => null);
      if (completedStatusElement) {
        let completedStatusExport = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent();
        expect(completedStatusExport).toEqual('Completed');
        let completedStatusExport1 = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(1).textContent();
        expect(completedStatusExport1).toEqual('Completed');
        let completedStatusExport2 = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(2).textContent();
        expect(completedStatusExport2).toEqual('Completed');
        let completedStatusExport3 = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(3).textContent();
        expect(completedStatusExport3).toEqual('Completed');
        await test.step("C12034", async () => {
          if (completedStatusExport && completedStatusExport1 && completedStatusExport2 && completedStatusExport3 == 'Completed') {
            let successStatus = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(0).textContent();
            expect(successStatus).toEqual('Success');
            let successStatus1 = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(1).textContent();
            expect(successStatus1).toEqual('Success');
            let successStatus2 = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(2).textContent();
            expect(successStatus2).toEqual('Success');
            let successStatus3 = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(3).textContent();
            expect(successStatus3).toEqual('Success');
          }
        });
      } else {
        await waitForCompletionStatus(page, selectors);
      }
    }
    test.step("*** Verified flow is running successfully in production run ***", async () => { });
    test.step("*** Verified Changing the active source should change the sample data being shown in the flow steps. ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page ***", async () => { });
  });
});

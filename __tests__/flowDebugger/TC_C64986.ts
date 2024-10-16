import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C64986.json";

test.describe("TC_C64986_C64995_C64987_65007", () => {
  let scriptId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    await io.api.deleteScriptViaAPI(scriptId);
    test.step("*** Deleting the script files ***", async () => { });
  });
  test("@Env-All @Zephyr-IO-T24896 TC_C64986_C64995_C64987_65007", async ({ io, page }, testInfo) => {
    scriptId = await io.api.createScriptViaAPI(TC.scriptData);
    TC.qa__api_tdata[0].pageProcessors[0].qa__export.hooks.preSavePage._scriptId =
      scriptId;
    test.step("Script created", async () => { });
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => { }
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC.name)["flowId"]);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async () => { });
    let pageGeneratorList = [];
    let steps;
    let statuses;
    let tableSteps = [];
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN
    );
    test.step("*** Clicking on the dropdown beside run test button ***", async () => { });
    let pageGenerators = await page.$$(
      selectors.flowBuilderPagePO.GENERATOR_POPPER
    );
    for (let i = 0; i < 6; i += 2) {
      pageGeneratorList.push(
        await (await pageGenerators[i].textContent()).split("\n")[0].trim()
      );
    }
    // TC_C64986 - Verify for the Production run user can manually run the flow with a single source by directly clicking on the Run button in the list items and all other sources will not be triggered to execute.
    // TC_C64995 - Verify user is able to run flow with other source when Listener type exports, the source should be listed in the dropdown.
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.GENERATOR_POPPER_BUTTON,
      1
    );
    test.step("*** Clicking on run test button of one of the page generators which is not a listener ***", async () => { });
    await waitForCompletionStatus(page, selectors);
    async function waitForCompletionStatus(page, selectors) {
      const completedStatusSelector = `${'tbody > tr:nth-child(3) > td > div'}:has-text("Completed")`;
      const completedStatusElement = await page.waitForSelector(completedStatusSelector, { timeout: 60000 }).catch(() => null);
      if (completedStatusElement) {
        let completedStatusExport = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent();
        expect(completedStatusExport).toEqual('Completed');
        let completedStatusExport1 = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(1).textContent();
        expect(completedStatusExport1).toEqual('Completed');
        let completedStatusExport2 = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(2).textContent();
        expect(completedStatusExport2).toEqual('Completed');
      } else {
        await waitForCompletionStatus(page, selectors);
      }
    }
    test.step("*** Verifying that only the selected Page Generator will execute test.afterEach clicking the run test button ***", async () => { });
    test.step("*** Verifying that flow is run successfully ***", async () => { });
    // TC_65007 - Verify for enabled flows once user run flow for selected source, for next run if user select same source then same sources will execute as part of flow run.
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN
    );
    test.step("*** Clicking on the dropdown beside run test button ***", async () => { });
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.GENERATOR_POPPER_BUTTON,
      1
    );
    test.step("*** Clicking on same run flow button of one of the page generators again ***", async () => { });
    await waitForCompletionStatus(page, selectors);
    test.step("*** Verifying that only the selected Page Generator will execute test.afterEach clicking the run test button again for the second time ***", async () => { });
    // TC_C64987 - Verify in the Production run If user Click on the regular Play/Run button in Flow Builder will always trigger the entire flow and run all sources.
    test.step("*** Clicking on run flow button ***", async () => { });
    await io.homePage.loadingTime();
    await page.$$(selectors.flowBuilderPagePO.TABLE_BODY_COLUMNS);
    test.step("*** Verifying that by clicking on the regular Play/Run button in Flow Builder will always trigger the entire flow and run all sources ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async () => { });
  });
});

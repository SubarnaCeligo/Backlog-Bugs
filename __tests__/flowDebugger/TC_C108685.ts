import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Flow from "@testData/FlowDebugger/C108685.json";
import script from "@testData/FlowDebugger/C108675_script.json";

test.describe("TC_C108685 Verify Editing / reordering / restructuring input and output filter should clear test run results.", () => {
  let outputFilter;
  let id;
  test.beforeEach(async ({ io }) => {
    outputFilter = await io.api.createScriptViaAPI(script.filter);
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test("@Env-All @Zephyr-IO-T23944 C108685 Verify Editing / reordering / restructuring input and output filter should clear test run results.", async ({
    io,
    page
  }) => {
    Flow.pageGenerators[0].qa__export.filter.script._scriptId = outputFilter;
    id = await io.createResourceFromAPI(Flow, "FLOWS");
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.FLOW_TOGGLE
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH
    );
    const completed = page.getByText('Completed').nth(1);
    await completed.waitFor({ state: 'visible', timeout: 900000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    await page.waitForTimeout(5000);
    await io.flowBuilder.clickByText("Script");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FUNCTION_NAME_INPUT);
    await io.flowBuilder.fill(
      selectors.flowBuilderPagePO.FUNCTION_NAME_INPUT,
      "function1"
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.NOTIFICTION_BAR);
    await io.assert.verifyElementText(
      selectors.basePagePO.NOTIFICTION_BAR,
      "Making edits to a flow (including modifying a step, changing step options, changing the test run source, or reordering steps) will clear all test results.Run a new test after making edits to see accurate results."
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.assert.checkElementState(
      selectors.integrationPagePO.CLICKONERRORS,
      "isHidden"
    );
  });
});

import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Flow from "@testData/FlowDebugger/C108675.json";
import script from "@testData/FlowDebugger/C108675_script.json";

test.describe("TC_C108688 Verify Editing any flow resources should clear test run results.", () => {
  let transform;
  let id;
  test.beforeEach(async ({ io }) => {
    transform = await io.api.createScriptViaAPI(script.transform);
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test("@Env-All @Zephyr-IO-T23947 C108688 Verify Editing any flow resources should clear test run results.", async ({
    io,
    page
  }) => {
    Flow.pageGenerators[0].qa__export.transform.script._scriptId = transform;
    id = await io.createResourceFromAPI(Flow, "FLOWS");
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.FLOW_TOGGLE
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.flowBuilder.clickByText("Script");
    await io.flowBuilder.fill(
      selectors.flowBuilderPagePO.FUNCTION_NAME_INPUT,
      "function1"
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.assert.checkElementState(
      selectors.integrationPagePO.CLICKONERRORS,
      "isHidden"
    );
  });
});

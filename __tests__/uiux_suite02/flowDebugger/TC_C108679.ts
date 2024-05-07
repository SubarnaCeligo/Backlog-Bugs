import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Flow from "@testData/FlowDebugger/C108679.json";
import script from "@testData/FlowDebugger/C108675_script.json";

test.describe("TC_C108679 Verify whether Hotspot icons when input filter is errored out", () => {
  let filterId;
  let id;
  test.beforeEach(async ({ io }) => {
    filterId = await io.api.createScriptViaAPI(script.filter);
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test("@Env-All @Zephyr-IO-T23938 C108679 Verify whether Hotspot icons when input filter is errored out", async ({
    io,
    page
  }) => {
    Flow.pageGenerators[0].qa__export.filter.script._scriptId = filterId;
    id = await io.createResourceFromAPI(Flow, "FLOWS");
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.FLOW_TOGGLE
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.exportsPagePO.EXPORT_HOTSPOT_ICON,
      "Hotspot icons are not available on Export"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.exportsPagePO.EXPORT_FILTER_HOTSPOT_ICON,
      "Hotspot icons are not available on Export Filter"
    );
  });
});

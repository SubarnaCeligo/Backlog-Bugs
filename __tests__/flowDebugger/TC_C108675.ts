import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Flow from "@testData/FlowDebugger/C108675.json";
import script from "@testData/FlowDebugger/C108675_script.json";

test.describe("TC_C108675 Verify whether Hotspot icons when transformation rules is errored out", () => {
  let transform;
  let id;
  test.beforeEach(async ({ io, page }) => {
    transform = await io.api.createScriptViaAPI(script.transform);
  });
  test.afterEach(async ({ io, page }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test("@Env-All @Zephyr-IO-T23934 C108675 Verify whether Hotspot icons when transformation rules is errored out", async ({
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
      selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.exportsPagePO.EXPORT_HOTSPOT_ICON,
      "Hotspot icons is not available on Export"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.exportsPagePO.EXPORT_TRANSFORMATION_HOTSPOT_ICON,
      "Hotspot icons is not available on Export Transformation"
    );
  });
});

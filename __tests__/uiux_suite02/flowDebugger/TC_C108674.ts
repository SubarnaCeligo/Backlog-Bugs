import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Flow from "@testData/FlowDebugger/C108674.json";

test.describe("TC_C108674 Verify whether Hotspot icons when result mapping is properly configured", () => {
  let flowId;
  test.afterEach(async ({ io, page }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("@Env-All @Zephyr-IO-T23933 C108674 Verify whether Hotspot icons when result mapping is properly configured", async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(Flow, "FLOWS");
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
      selectors.importPagePO.IMPORT_HOTSPOT_ICON,
      "Hotspot icons is not available on Import"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.importPagePO.IMPORT_MAPPINGS_HOTSPOT_ICON,
      "Hotspot icons is not available on Import Mapping"
    );
  });
});

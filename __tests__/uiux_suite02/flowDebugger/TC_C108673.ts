import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Flow from "@testData/FlowDebugger/C108673.json";

test.describe("TC_C108673 Verify whether Hotspot icons when result mapping is errored out", () => {
  let flowId;
  test.afterEach(async ({ io, page }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("C108673 Verify whether Hotspot icons when result mapping is errored out", async ({
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

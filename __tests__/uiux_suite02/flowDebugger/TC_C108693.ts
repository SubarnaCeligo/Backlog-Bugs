import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Flow from "@testData/FlowDebugger/C108677.json";
import script from "@testData/FlowDebugger/C108675_script.json";

test.describe("TC_C108693 Verify Hotspot icons for handelbars after the test runs", () => {
  let hookId;
  let id;
  test.beforeEach(async ({ io }) => {
    hookId = await io.api.createScriptViaAPI(script.preSavePage);
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test("@Env-All @Zephyr-IO-T23952 C108693 Verify Hotspot icons for handelbars after the test runs", async ({
    io,
    page
  }) => {
    Flow.pageGenerators[0].qa__export.hooks.preSavePage._scriptId = hookId;
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
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.EXPORT_HOTSPOT_ICON);
    await io.assert.verifyElementIsDisplayed(
      selectors.exportsPagePO.EXPORT_HOTSPOT_ICON,
      "Hotspot icons is not available on Export"
    );
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.EXPORT_HOOKS_HOTSPOT_ICON);
    await io.assert.verifyElementIsDisplayed(
      selectors.exportsPagePO.EXPORT_HOOKS_HOTSPOT_ICON,
      "Hotspot icons is not available on Export Hooks"
    );
  });
});

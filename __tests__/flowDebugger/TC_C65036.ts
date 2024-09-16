import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/FlowDebugger/C65036.json"

test.describe("TC_C65036 Verify During a test run, the progress of the run is shown in the Flow Builder console, only the spinner should show.", () => {
    let id;
    test.afterEach(async ({ io }) => {
      await io.api.deleteFlowViaAPI(id);
    });
    test("@Zephyr-IO-T24940 @Env-All C65036 Verify During a test run, the progress of the run is shown in the Flow Builder console, only the spinner should show.", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(flow, "FLOWS");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.FLOW_TOGGLE
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
    let progressBar = await page.locator(selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR).nth(0).isVisible();
    await io.assert.expectToBeTrue(progressBar, "Progress Bar is not visible");
  });
});

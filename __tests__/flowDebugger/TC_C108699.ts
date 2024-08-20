import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Flow from "@testData/FlowDebugger/C108699.json";

test.describe("TC_C108699 Verify the warining message for edit export,import and lookup", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test("@Zephyr-IO-T19768 @Env-All C108699 Verify the warining message for edit export,import and lookup", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(Flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + id
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.FLOW_TOGGLE
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
    await page.pause();
    let errors = page.locator(selectors.integrationPagePO.CLICKONERRORS);
    await errors.waitFor({state: 'visible', timeout: 500000});
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "TC_C108699 Export1");
    await io.assert.verifyElementText(
        selectors.flowBuilderPagePO.EXPORT_NOTIFICATION_ERROR_MESSAGE,
        "Making edits to a flow (including modifying a step, changing step options, changing the test run source, or reordering steps) will clear all test results.Run a new test after making edits to see accurate results."
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
    await errors.waitFor({state: 'visible', timeout: 500000});
    var success = page.locator(selectors.integrationPagePO.CLICKONERRORS);
    var successCount = await success.count();
    for (var index = 0; index < successCount; index++) {
        await io.assert.expectToBeTrue(await success.nth(index).isVisible(), 'Errors Text is not visible');
    }
  });
});

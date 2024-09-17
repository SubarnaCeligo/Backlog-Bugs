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
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.FLOW_TOGGLE
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
    await page.getByText("Test run in progress").nth(1).waitFor({ state: "hidden", timeout:360000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "TC_C108699 Export1");
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementText(
        selectors.flowBuilderPagePO.EXPORT_NOTIFICATION_ERROR_MESSAGE,
        "Making edits to a flow (including modifying a step, changing step options, changing the test run source, or reordering steps) will clear all test results.Run a new test after making edits to see accurate results."
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
    await io.flowBuilder.loadingTime();
    await page.getByText("Test run in progress").nth(1).waitFor({ state: "hidden", timeout:360000 });

    //verify success count and run status for export
    let completedStatusExport =  await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent();
    expect(completedStatusExport).toEqual('Completed');
    if(completedStatusExport == 'Completed'){
        let successStatus = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(0).textContent();
        expect(successStatus).toEqual('Success');
        let successCount = await page.locator(selectors.flowBuilderPagePO.RUN_SUCCESS_COUNT).nth(0).textContent();
        expect(successCount).toEqual('10');
    
    }
  });
});

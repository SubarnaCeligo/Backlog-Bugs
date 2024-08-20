import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Flow from "@testData/FlowDebugger/T23942.json";
import script from "@testData/FlowDebugger/T23942_script.json";

test.describe("IO-T23942 Verify Editing any flow step / reordering / restructuring the flow should clear test run results.", () => {
  let transform;
  let id;
  test.beforeEach(async ({ io }) => {
    transform = await io.api.createScriptViaAPI(script.transform);
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test("@Priority-P2 @Zephyr-IO-T23942 @Env-All Verify Editing any flow step / reordering / restructuring the flow should clear test run results.", async ({
    io,
    page
  }) => {
    // create flow
    Flow.pageGenerators[0].qa__export.transform.script._scriptId = transform;
    id = await io.createResourceFromAPI(Flow, "FLOWS");
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.FLOW_TOGGLE
    );

    // run test
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH).first().click();

    // edit flow step
    await io.flowBuilder.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.flowBuilder.fill(
      selectors.flowBuilderPagePO.FUNCTION_NAME_INPUT,
      "function1"
    );
    await io.assert.verifyElementText(
      selectors.basePagePO.NOTIFICTION_BAR,
      "Making edits to a flow (including modifying a step, changing step options, changing the test run source, or reordering steps) will clear all test results.Run a new test after making edits to see accurate results."
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

    // check if test results are cleared
    await io.assert.checkElementState(
      selectors.integrationPagePO.CLICKONERRORS,
      "isHidden"
    );

    // re-run the run test
    await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH).first().click();

    // add import
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.connectionsPagePO.TRANSFER_FILES);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "HTTP ZENDESK CONNECTION");
    await io.flowBuilder.clickByTextByIndex("HTTP ZENDESK CONNECTION", 0);
    await io.assert.verifyElementText(
      selectors.basePagePO.NOTIFICTION_BAR,
      "Making edits to a flow (including modifying a step, changing step options, changing the test run source, or reordering steps) will clear all test results.Run a new test after making edits to see accurate results."
    );
    await io.exportsPage.fill(selectors.exportsPagePO.NAME, "Import name");
    await io.flowBuilder.click(selectors.exportsPagePO.LOOKUP.HTTP_METHOD);
    await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

    // check if test results are cleared
    await io.assert.checkElementState(
      selectors.integrationPagePO.CLICKONERRORS,
      "isHidden"
    );
  });
});

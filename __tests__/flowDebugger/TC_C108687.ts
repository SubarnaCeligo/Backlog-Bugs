import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C108678 from '../../testData/inputData/FlowDebugger/C108678.json';
import SCRIPT from "@testData/FlowDebugger/C108678_script.json"

test.describe("TC_C108687 Verify Editing / reordering / restructuring hooks should clear test run results.", () => {
    let preSavePageFilter;

    test.beforeEach(async ({ io }) => {
        preSavePageFilter = await io.api.createScriptViaAPI(SCRIPT.preSavePage);
    });

    test.afterEach(async ({ io }) => {
        await io.api.deleteScriptViaAPI(preSavePageFilter);
    });

  test("@Zephyr-T23946 @Env-All @Priority-P2 TC_C108687 Verify Editing / reordering / restructuring hooks should clear test run results. UI_Backlog", async ({ io, page }) => {
    C108678.pageGenerators[0].qa__export.hooks.preSavePage._scriptId = preSavePageFilter;
    await io.createResourceFromAPI(C108678, "FLOWS");

    //Disable the flow
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);

    await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_HOOKS);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.SCRIPT_NAME, 'preSavePage  ');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

    let alert = await page.locator(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    let alertText = await alert.evaluate((el) => {
        return el.textContent
    }); 

    expect(alertText).toEqual("Test results were cleared because you made flow edits.Run a new test after making edits to see accurate results.");
    await page.waitForTimeout(7000);

    let alert1 = await page.$$(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    expect(alert1.length).toBe(0);

  });
});
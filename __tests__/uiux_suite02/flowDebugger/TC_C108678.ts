import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C108678 from '../../../testData/inputData/FlowDebugger/C108678.json';
import SCRIPT from "@testData/FlowDebugger/C108678_script.json"

test.describe("TC_C108678 Verify whether Hotspot icons when hooks is properly configured", () => {
    let preSavePageFilter;

    test.beforeEach(async ({ io }) => {
        preSavePageFilter = await io.api.createScriptViaAPI(SCRIPT.preSavePage);
    });

    test.afterEach(async ({ io }) => {
        await io.api.deleteScriptViaAPI(preSavePageFilter);
    });

  test("@Zephyr-T23937 @Env-All @Priority-P2 TC_C108678 Verify whether Hotspot icons when hooks is properly configured UI_Backlog", async ({ io, page }) => {
    C108678.pageGenerators[0].qa__export.hooks.preSavePage._scriptId = preSavePageFilter;
    await io.createResourceFromAPI(C108678, "FLOWS");

    //Disable the flow
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click()
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);

    let lookupBadge = page.locator(selectors.exportsPagePO.TRANSFER_HOTSPOT_ICON).nth(1);
    expect(lookupBadge).toBeVisible();

    let importBadge = page.locator(selectors.exportsPagePO.TRANSFER_HOTSPOT_ICON).nth(2);
    expect(importBadge).toBeVisible();
  });
});
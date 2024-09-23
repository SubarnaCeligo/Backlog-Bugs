import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51638 from "@testData/EM2.0/C51638.json"

test.describe("C51638 Verify the Footer buttons in the Error details tab of Resolved Errors drawer", () => {
    let errorFlowId
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(errorFlowId)
    });
    test("@Zephyr-IO-T19790 @Env-All C51638 Verify the Footer buttons in the Error details tab of Resolved Errors drawer", async ({ io, page }) => {
        errorFlowId = await io.createResourceFromAPI(C51638, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51638', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({ state: 'visible', timeout: 360000 });
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FLOWS_LIST, 1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU_RESOLVE_ERROR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB);
        await io.flowBuilder.clickByText('Refresh errors');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU_EDIT_RETRY_DATA);
        await io.assert.verifyElementDisplayedByText("Save & retry", "Save & retry no present");
        await io.assert.verifyElementDisplayedByText("Save & close", "Save & close no present");
        await io.assert.verifyElementDisplayedByText("Close", "Close no present");
    });
});

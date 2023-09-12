import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51638 from "../../../testData/EM2.0/C51638.json"

test.describe("C51638 Verify the Footer buttons in the Error details tab of Resolved Errors drawer", () => {
    test("C51638 Verify the Footer buttons in the Error details tab of Resolved Errors drawer", async ({io, page}) => {
        const errorFlowId = await io.fillFormUI(C51638, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51638', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible', timeout: 180000});
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN_OPTIONS, 1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU_RESOLVE_ERROR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.RESOLVED_ERRORS_TAB);
        await io.flowBuilder.clickByText('Refresh errors');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU_EDIT_RETRY_DATA);
        await io.assert.verifyElementDisplayedByText("Save & retry", "Save & retry no present");
        await io.assert.verifyElementDisplayedByText("Save & close", "Save & close no present");
        await io.assert.verifyElementDisplayedByText("Close", "Close no present");
    });
});

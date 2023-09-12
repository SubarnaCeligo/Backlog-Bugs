import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C52094 from "../../../testData/EM2.0/C52094.json"

test.describe("C52094 Verify the 'Add to Batch' check box option in both 'Current View' & 'New view'", () => {
    test("C52094 Verify the 'Add to Batch' check box option in both 'Current View' & 'New view'", async ({io, page}) => {
        const errorFlowId = await io.fillFormUI(C52094, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C52094', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible', timeout: 180000});
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.ADD_TO_BATCH);
        expect(await page.$(selectors.flowBuilderPagePO.EM2dot0PO.ADD_TO_BATCH)).not.toBe(null);

        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN);
        const views = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN_OPTIONS);
        views[1].click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU_EDIT_RETRY_DATA);
        expect(page.locator(selectors.flowBuilderPagePO.EM2dot0PO.ADD_TO_BATCH).nth(1)).toBeVisible();
    });
});

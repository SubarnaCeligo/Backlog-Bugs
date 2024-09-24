import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C52094 from "@testData/EM2.0/C52094.json"

test.describe("C52094 Verify the 'Add to Batch' check box option in both 'Current View' & 'New view'", () => {
    let errorFlowId
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(errorFlowId)
    });
    test("@Zephyr-IO-T19832 @Env-All C52094 Verify the 'Add to Batch' check box option in both 'Current View' & 'New view'", async ({ io, page }) => {
        errorFlowId = await io.createResourceFromAPI(C52094, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C52094', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({ state: 'visible', timeout: 360000 });
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.loadingTime()
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.ADD_TO_BATCH);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EM2DOT0PO.ADD_TO_BATCH, "Add to batch not displayed in new view");

        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN);
        await io.flowBuilder.addStep("Changing the view from dropdown");
        const views = await page.$$(selectors.flowBuilderPagePO.FLOWS_LIST);
        views[1].click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU_EDIT_RETRY_DATA);
        await io.assert.verifyElementIsDisplayed(`:nth-match(:text("Add to batch"), 2)`, "Add  to batch not displayed in current view");
    });
});

import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51627 from '@testData/EM2.0/C51627.json';

test.describe("C51627 Verify the list and the default status of the footer buttons displayed in the 'Error details' drawer", () => {
    let id
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(id)
    });
    test("@Zephyr-IO-T19779 @Env-All C51627 Verify the list and the default status of the footer buttons displayed in the 'Error details' drawer", async ({ io, page }) => {
        id = await io.createResourceFromAPI(C51627, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51627', id);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({ state: 'visible', timeout: 360000 });
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_AND_NEXT);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_AND_NEXT, 'Retry and next is not displayed');
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EM2DOT0PO.SAVE_AND_NEXT, 'Save and next is not displayed');
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EM2DOT0PO.RESOLVE_AND_NEXT, 'Resolve and next is not displayed');
    });
});
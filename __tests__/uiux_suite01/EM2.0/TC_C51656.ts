import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51656 from "@testData/EM2.0/C51656.json"

test.describe("C51656 Verify the Scroll bar for Message column in the Error rows page in the New view", () => {
    let errorFlowId
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(errorFlowId)
    });
    test("@Zephyr-IO-T19808 @Env-All C51656 Verify the Scroll bar for Message column in the Error rows page in the New view", async ({ io, page }) => {
        errorFlowId = await io.createResourceFromAPI(C51656, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51656', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({ state: 'visible', timeout: 360000 });
        await io.homePage.reloadPage()
        await io.homePage.loadingTime()
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS_TABLE_ROWS);
        expect(await io.flowBuilder.isScrollable(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS_MESSAGE_COLUMN)).toBe(false);
    });
});
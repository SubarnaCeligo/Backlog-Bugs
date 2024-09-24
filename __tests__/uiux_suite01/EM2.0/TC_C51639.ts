import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51639 from '@testData/EM2.0/C51639.json';

test.describe("C51639 Verify the download option in the Resolved Error drawer", () => {
    let id
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(id)
    });
    test("@Zephyr-IO-T19791 @Env-All C51639 Verify the download option in the Resolved Error drawer", async ({ io, page }) => {
        id = await io.createResourceFromAPI(C51639, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51639', id);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({ state: 'visible', timeout: 360000 });
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.NEW_VIEW_ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.NEW_VIEW_ACTIONS_MENU);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EM2DOT0PO.DOWNLOAD_ERRORS, "Download errors not displayed");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RESOLVE_AND_NEXT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB);
        await io.flowBuilder.clickByText('Refresh errors');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.NEW_VIEW_ACTIONS_MENU);
        await (await page.$$(selectors.flowBuilderPagePO.EM2DOT0PO.NEW_VIEW_ACTIONS_MENU))[0].click();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EM2DOT0PO.DOWNLOAD_ERRORS, "Download errors not displayed");
    });
});
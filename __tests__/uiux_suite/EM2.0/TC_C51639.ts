import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51639 from '@testData/EM2.0/C51639.json';

test.describe("C51639 Verify the download option in the Resolved Error drawer", () => {
    test("C51639 Verify the download option in the Resolved Error drawer", async ({io, page}) => {
        const id = await io.fillFormUI(C51639,"FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51639', id);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible', timeout: 180000});
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.NEW_VIEW_ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.NEW_VIEW_ACTIONS_MENU);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EM2dot0PO.DOWNLOAD_ERRORS, "Download errors not displayed");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.RESOLVE_AND_NEXT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.RESOLVED_ERRORS_TAB);
        await io.flowBuilder.clickByText('Refresh errors');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.NEW_VIEW_ACTIONS_MENU);
        await (await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.NEW_VIEW_ACTIONS_MENU))[0].click();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EM2dot0PO.DOWNLOAD_ERRORS, "Download errors not displayed");
    });
});
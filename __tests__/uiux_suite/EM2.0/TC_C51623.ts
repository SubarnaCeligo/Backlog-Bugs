import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '@testData/EM2.0/TC_C51661.json';

test.describe("C51623 Verify the Scroll bar for Message column in the Error rows page of New view by navigating from the Current View", () => {
    test("C51623 Verify the Scroll bar for Message column in the Error rows page of New view by navigating from the Current View", async ({io, page}) => {
        const errorFlowId = await io.createResourceFromAPI(C51661, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51661', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible', timeout: 180000});
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN)
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN);
        const options = await page.$$(selectors.flowBuilderPagePO.FLOWS_LIST);
        options[1].click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS_TABLE_ROWS);
        const isMessageColumnScrollable = await io.flowBuilder.isScrollable(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS_MESSAGE_COLUMN);
        await io.assert.expectToBeTrue(!isMessageColumnScrollable, "Message column scrollable");
    });
});
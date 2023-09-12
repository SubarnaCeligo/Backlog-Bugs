import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51656 from "../../../testData/EM2.0/TC_ C51656.json"

test.describe("C51656 Verify the Scroll bar for Message column in the Error rows page in the New view", () => {
    test("C51656 Verify the Scroll bar for Message column in the Error rows page in the New view", async ({io, page}) => {
        const errorFlowId = await io.fillFormUI(C51656, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51656', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible',timeout:60000*3});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS);
        expect(await io.flowBuilder.isScrollable(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_MESSAGE_COLUMN)).toBe(false);
    });
});
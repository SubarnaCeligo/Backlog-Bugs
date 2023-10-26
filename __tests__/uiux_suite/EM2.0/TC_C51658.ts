import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51658 from "@testData/EM2.0/C51658.json"

test.describe("C51658 Verify the Parent drawer underneath while checking the Error Details in the New view(Edit Retry Data)", () => {
    test("C51658 Verify the Parent drawer underneath while checking the Error Details in the New view(Edit Retry Data)", async ({io, page}) => {
        const errorFlowId = await io.fillFormUI(C51658, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51658', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible', timeout: 180000});
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS);
        const errorList = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS);
        await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS, 'class', 'Mui-selected')
    });
});
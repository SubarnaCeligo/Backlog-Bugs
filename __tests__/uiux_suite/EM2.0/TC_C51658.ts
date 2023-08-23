import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51656 from "../../../testData/EM2.0/TC_ C51656.json"

test.describe("C51658 Verify the Parent drawer underneath while checking the Error Details in the New view(Edit Retry Data)", () => {
    test("C51658 Verify the Parent drawer underneath while checking the Error Details in the New view(Edit Retry Data)", async ({io, page}) => {
        const errorFlowId = await io.fillFormUI(C51656, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51656', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS);
        const errorList = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS);
        expect(await errorList[0].getAttribute('class')).toContain('Mui-selected');
    });
});
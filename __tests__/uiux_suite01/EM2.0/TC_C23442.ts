import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51656 from "@testData/EM2.0/TC_ C51656.json"

test.describe("C23442 EM1.0 Timestamp on run dashboard does not follow user time preference setting", () => {
    test("C23442 EM1.0 Timestamp on run dashboard does not follow user time preference setting", async ({io, page}) => {
        const errorFlowId = await io.createResourceFromAPI(C51656, "FLOWS");
        await io.homePage.loadingTime()
        await io.api.runBatchFlowViaAPI('TC_C51656', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible',timeout:18000});
        const runConsoleRows = await page.$$('table tbody tr');
        const firstRowColumns = await runConsoleRows[0].$$('td');
        await firstRowColumns[7].hover();
        expect(await page.$(selectors.flowBuilderPagePO.EM2DOT0PO.COMPLETED_ROWS_HOVER)).toBeDefined();
    });
});
import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51530 from '@testData/EM2.0/C51530.json';

test.describe("C51530 Verify when retries are completed for a step and same step is removed from flow, we show the Retrying complete and no data should display  in view results", () => {
    let id
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(id)
    });
    test("@Zephyr-IO-T23336 @Env-All C51530 Verify when retries are completed for a step and same step is removed from flow, we show the Retrying complete and no data should display  in view results", async ({ io, page }) => {
        id = await io.createResourceFromAPI(C51530, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51530', id);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({ state: 'visible', timeout: 360000 });
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_ALL_OPTION);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY)
        expect((await page.$$(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS_TABLE_ROWS)).length).toBe(1);
    });
});

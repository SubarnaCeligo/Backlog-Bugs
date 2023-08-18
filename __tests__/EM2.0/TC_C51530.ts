import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '../../testData/EM2.0/TC_C51661.json';

test.describe("C51530 Verify when retries are completed for a step and same step is removed from flow, we show the Retrying complete and no data should display  in view results", () => {
    test.only("C51530 Verify when retries are completed for a step and same step is removed from flow, we show the Retrying complete and no data should display  in view results", async ({io, page}) => {
        const id = await io.fillForm(C51661,"FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51661', id);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.waitForElementAttached("[data-test='retryJobs']");
        await io.flowBuilder.click("[data-test='retryJobs']");
        await io.flowBuilder.click("[role='listbox'] [data-value='all']");
        await io.flowBuilder.click("[data-test='Retry']")
        expect((await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS)).length).toBe(1);
    });
});

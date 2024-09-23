import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C24621 from '@testData/EM2.0/C24621.json'

test.describe("C24621_Verify the behaviour of Retry & Resolve dropdown with <1000 errors on Monitor whole account user", () => {
    let errorFlowId
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(errorFlowId)
    });
    test("@Zephyr-IO-T7215 @@Env-All C24621_Verify the behaviour of Retry & Resolve dropdown with <1000 errors on Monitor whole account user UI_Backlog", async ({ io, page, }) => {
        errorFlowId = await io.createResourceFromAPI(C24621, "FLOWS");
        await io.flowBuilder.loadingTime();
        await io.api.runBatchFlowViaAPI('C24621_Retry_and_Resolve_Errors', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({ state: 'visible', timeout: 360000 });
        await io.flowBuilder.reloadPage();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByTextByIndex('1 error', 1)
        await io.flowBuilder.clickByText('Retry & next')
        await io.flowBuilder.clickByText('Resolved errors')
        await io.flowBuilder.clickByText('Retries')
        // Validating Resolved errors and retries added
        await io.assert.verifyElementDisplayedByText('Resolved errors', 'Error not available')
        await io.assert.verifyElementDisplayedByText('Retries', 'Error not available')
    });
});

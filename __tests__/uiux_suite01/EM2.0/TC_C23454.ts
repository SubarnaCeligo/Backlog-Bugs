import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C23454 from '@testData/EM2.0/C23454.json'

test.describe("C23454_Display retries info", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    let errorFlowId
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(errorFlowId)
    });
    test("C23454_Display retries info UI_Backlog", async ({ io, page, }) => {
        errorFlowId = await io.createResourceFromAPI(C23454, "FLOWS");
        await io.flowBuilder.loadingTime();
        await io.api.runBatchFlowViaAPI('C23454_Resolve_Errors', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({ state: 'visible', timeout: 180000 });
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByTextByIndex('1 error',1)
        await io.flowBuilder.clickByText('Resolve & next')
        // Validating resolved count added
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.RESOLVE_TEXTCOUNT, '| Resolves: 1')
    });
});

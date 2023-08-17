import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '../../testData/EM2.0/TC_C51661.json';

test.describe("C51661 Verify the 'Error details' header fields displayed in the New View", () => {
    test("C51661 Verify the 'Error details' header fields displayed in the New View", async ({io, page}) => {
        const errorFlowId = await io.fillForm(C51661, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51661', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.ERROR_DETAILS_TAB_LIST)
        const errorDetailsTabs = await page.$(selectors.flowBuilderPagePO.EM2dot0PO.ERROR_DETAILS_TAB_LIST);
        expect(await errorDetailsTabs.$('text="Edit retry data"')).toBeDefined();
        expect(await errorDetailsTabs.$('text="HTTP request"')).toBeDefined();
        expect(await errorDetailsTabs.$('text="HTTP response"')).toBeDefined();
        expect(await errorDetailsTabs.$('text="Error Fields"')).toBeDefined();
    });
});
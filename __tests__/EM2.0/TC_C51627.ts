import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '../../testData/EM2.0/TC_C51661.json';

test.describe("C51627 Verify the list and the default status of the footer buttons displayed in the 'Error details' drawer", () => {
    test.only("C51627 Verify the list and the default status of the footer buttons displayed in the 'Error details' drawer", async ({io, page}) => {
        const id = await io.fillForm(C51661,"FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51661', id);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.RETRY_AND_NEXT);
        expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.RETRY_AND_NEXT)).toBe(true);
        expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.SAVE_AND_NEXT)).toBe(true);
        expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.RESOLVE_AND_NEXT)).toBe(true);
    });
});
import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '../../testData/EM2.0/TC_C51661.json';

test.describe("C51639 Verify the download option in the Resolved Error drawer", () => {
    test.only("C51639 Verify the download option in the Resolved Error drawer", async ({io, page}) => {
        const id = await io.fillForm(C51661,"FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51661', id);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.NEW_VIEW_ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.NEW_VIEW_ACTIONS_MENU);
        expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.DOWNLOAD_ERRORS)).toBe(true)
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.RESOLVE_AND_NEXT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.RESOLVED_ERRORS_TAB);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.NEW_VIEW_ACTIONS_MENU);
        await (await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.NEW_VIEW_ACTIONS_MENU))[0].click();
        expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.DOWNLOAD_ERRORS)).toBe(true)
    });
});
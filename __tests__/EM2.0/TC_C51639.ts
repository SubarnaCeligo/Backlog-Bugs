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
        await io.flowBuilder.waitForElementAttached(".MuiPaper-elevation16 [data-test='openActionsMenu']");
        await io.flowBuilder.click(".MuiPaper-elevation16 [data-test='openActionsMenu']");
        expect(await io.flowBuilder.isVisible("[data-test='downloadErrors']")).toBe(true)
        await io.flowBuilder.click('data-test="resolveAndNext"');
        await io.flowBuilder.click("[data-test='flow-builder-resolved-errors']");
        await io.flowBuilder.waitForElementAttached(".MuiPaper-elevation16 [data-test='openActionsMenu']");
        await (await page.$$(".MuiPaper-elevation16 [data-test='openActionsMenu']"))[0].click();
        expect(await io.flowBuilder.isVisible("[data-test='downloadErrors']")).toBe(true)
    });
});
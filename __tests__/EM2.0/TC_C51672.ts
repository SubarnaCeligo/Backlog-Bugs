import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '../../testData/EM2.0/TC_C51661.json';

test.describe("C51672 Verify the 'HTTP response' tab in the 'Error details' drawer", () => {
    test.only("C51672 Verify the 'HTTP response' tab in the 'Error details' drawer", async ({io, page}) => {
        const id = await io.fillFormUI(C51661,"FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51661', id);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.waitForElementAttached("text='HTTP response'");
        await io.flowBuilder.click("text='HTTP response'");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.BODY);
        expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.BODY)).toBe(true);
        expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.HEADERS)).toBe(true);
        expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.OTHER)).toBe(true);
        expect(await io.flowBuilder.isVisible('text="Add to batch"')).toBe(true);
        expect(await io.flowBuilder.isVisible('text="Resolve & next"')).toBe(true);
        expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.ADD_TO_BATCH_HOVER_LABEL)).toBe(true);
    });
});
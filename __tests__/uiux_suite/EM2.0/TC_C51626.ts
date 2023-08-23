import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51626 from "../../../testData/EM2.0/TC_C51626.json"

test.describe("C51626 Verify the Actions coloumn the New view by navigating from the current view", () => {
    test("C51626 Verify the Actions coloumn the New view by navigating from the current view", async ({io, page}) => {
        const errorFlowId = await io.fillFormUI(C51626, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51626', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN);
        let options = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN_OPTIONS);
        options[1].click();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN);
        options = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN_OPTIONS);
        options[0].click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_HEADERS);
        let columnTitles = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_HEADERS);
        columnTitles.forEach(async columnTitle => {
            const text = await columnTitle.textContent();
            expect(text).not.toBe('Actions');
        });
    });
});

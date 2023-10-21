import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51626 from "@testData/EM2.0/TC_C51626.json"

test.describe("C51626 Verify the Actions coloumn the New view by navigating from the current view", () => {
    test("C51626 Verify the Actions coloumn the New view by navigating from the current view", async ({io, page}) => {
        const errorFlowId = await io.fillFormUI(C51626, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51626', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible', timeout: 180000});
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN);
        let options = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN_OPTIONS);
        options[1].click();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN);
        options = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN_OPTIONS);
        options[0].click();
        await io.flowBuilder.delay(1000);
        const textArray = await io.flowBuilder.getText(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_HEADERS);
        await io.assert.expectNotToBeValueInArray(textArray,"Actions","Found Actions in Array");

    });
});

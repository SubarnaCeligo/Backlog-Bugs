import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51626 from "@testData/EM2.0/TC_C51626.json"

test.describe("C51626 Verify the Actions coloumn the New view by navigating from the current view", () => {
    let errorFlowId
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(errorFlowId)
    });
    test("@Zephyr-IO-T19778 @Env-All C51626 Verify the Actions coloumn the New view by navigating from the current view", async ({io, page}) => {
        errorFlowId = await io.createResourceFromAPI(C51626, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51626', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible', timeout: 360000});
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN);
        let options = await page.$$(selectors.flowBuilderPagePO.FLOWS_LIST);
        options[1].click();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN);
        options = await page.$$(selectors.flowBuilderPagePO.FLOWS_LIST);
        options[0].click();
        await io.flowBuilder.delay(1000);
        const textArray = await io.flowBuilder.getText(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS_TABLE_HEADERS);
        await io.assert.expectNotToBeValueInArray(textArray,"Actions","Found Actions in Array");

    });
});

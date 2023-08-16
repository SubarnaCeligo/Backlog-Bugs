import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51626 from "../../testData/EM2.0/TC_C51626.json"

test.describe("C52094 Verify the 'Add to Batch' check box option in both 'Current View' & 'New view'", () => {
    test("C52094 Verify the 'Add to Batch' check box option in both 'Current View' & 'New view'", async ({io, page}) => {
        const errorFlowId = await io.fillForm(C51626, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51626', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.waitForElementAttached('text="Add to batch"');
        expect(await page.$('text="Add to batch"')).not.toBe(null);

        await io.flowBuilder.click('#toggle-view');
        const views = await page.$$('[role=listbox] li');
        views[1].click();
        await io.flowBuilder.waitForElementAttached('.MuiPaper-elevation16 div .MuiTableRow-hover td [data-test=openActionsMenu]');
        await io.flowBuilder.click('.MuiPaper-elevation16 div .MuiTableRow-hover td [data-test=openActionsMenu]');
        await io.flowBuilder.click('[data-test=editRetryData]');
        expect(await page.$('text="Add to batch"')).not.toBe(null);
    });
});
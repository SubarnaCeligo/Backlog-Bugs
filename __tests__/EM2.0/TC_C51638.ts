import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51626 from "../../testData/EM2.0/TC_C51626.json"

test.describe("C51638 Verify the Footer buttons in the Error details tab of Resolved Errors drawer", () => {
    test("C51638 Verify the Footer buttons in the Error details tab of Resolved Errors drawer", async ({io, page}) => {
        const errorFlowId = await io.fillForm(C51626, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51664', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.click('#toggle-view');
        const options = await page.$$('[role=listbox] li');
        options[1].click();
        await io.flowBuilder.waitForElementAttached('.MuiPaper-elevation16 div .MuiTableRow-hover td [data-test=openActionsMenu]');
        await io.flowBuilder.click('.MuiPaper-elevation16 div .MuiTableRow-hover td [data-test=openActionsMenu]');
        await io.flowBuilder.click('[data-test=resolveError]');
        await io.flowBuilder.click('[data-test=flow-builder-resolved-errors]');
        await io.flowBuilder.waitForElementAttached('.MuiPaper-elevation16 div .MuiTableRow-hover td [data-test=openActionsMenu]');
        await io.flowBuilder.click('.MuiPaper-elevation16 div .MuiTableRow-hover td [data-test=openActionsMenu]');
        await io.flowBuilder.click('[data-test=editRetryData]');
        const saveRetry = page.getByText('Save & retry');
        const saveClose = page.getByText('Save & close');
        const close = page.getByText('Close');
        expect(saveRetry).toBeDefined();
        expect(saveClose).toBeDefined();
        expect(close).toBeDefined();
    });
});
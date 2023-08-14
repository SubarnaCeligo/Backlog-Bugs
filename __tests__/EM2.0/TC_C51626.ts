import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51626 from "../../testData/EM2.0/TC_C51626.json"

test.describe("C51626 Verify the Actions coloumn the New view by navigating from the current view", () => {
    test("C51626 Verify the Actions coloumn the New view by navigating from the current view", async ({io, page}) => {
        const errorFlowId = await io.fillForm(C51626, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51626', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.waitForElementAttached('.MuiPaper-elevation16 div .MuiTableRow-head th');
        let columnTitles = await page.$$('.MuiPaper-elevation16 div .MuiTableRow-head th');
        columnTitles.forEach(async columnTitle => {
            const text = await columnTitle.textContent();
            expect(text).not.toBe('Actions');
        });
    });
});
import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51655 from '@testData/EM2.0/TC_C51655.json';

test.describe("C51655 Verify the 'Error rows' navigation from one error row to the next using up/down arrow keys on the keyboard.", () => {
    let errorFlowId
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(errorFlowId)
    });
    test("C51655 Verify the 'Error rows' navigation from one error row to the next using up/down arrow keys on the keyboard.", async ({ io, page }) => {
        errorFlowId = await io.createResourceFromAPI(C51655, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51655', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({ state: 'visible', timeout: 360000 });
        await io.flowBuilder.clickByTextByIndex("11 errors", 1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS_TABLE_ROWS);
        await io.flowBuilder.addStep("Selecting the first error from the list");
        const errorRows = await page.$$(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS_TABLE_ROWS);
        await errorRows[0].click();
        await io.flowBuilder.addStep("Checking if first row from list is selected and second is not");
        expect(await errorRows[0].getAttribute('class')).toContain('Mui-selected');
        expect(await errorRows[1].getAttribute('class')).not.toContain('Mui-selected');
        await io.flowBuilder.addStep("Pressing down arrow and checking if second row from list is selected and first is not");
        await page.keyboard.press('ArrowDown');
        expect(await errorRows[1].getAttribute('class')).toContain('Mui-selected');
        expect(await errorRows[0].getAttribute('class')).not.toContain('Mui-selected');
        await io.flowBuilder.addStep("Pressing up arrow and checking if first row from list is selected and second is not");
        await page.keyboard.press('ArrowUp');
        expect(await errorRows[0].getAttribute('class')).toContain('Mui-selected');
        expect(await errorRows[1].getAttribute('class')).not.toContain('Mui-selected');
    });
});
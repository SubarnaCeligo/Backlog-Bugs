import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51655 from '../../testData/EM2.0/TC_C51655.json';

test.describe("C51655 Verify the 'Error rows' navigation from one error row to the next using up/down arrow keys on the keyboard.", () => {
    test("C51655 Verify the 'Error rows' navigation from one error row to the next using up/down arrow keys on the keyboard.", async ({io, page}) => {
        const errorFlowId = await io.fillForm(C51655, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51655', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("2 errors").nth(1).click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS);
        const errorRows = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS);
        await errorRows[0].click();
        expect(await errorRows[0].getAttribute('class')).toContain('Mui-selected');
        expect(await errorRows[1].getAttribute('class')).not.toContain('Mui-selected');
        await page.keyboard.press('ArrowDown');
        expect(await errorRows[1].getAttribute('class')).toContain('Mui-selected');
        expect(await errorRows[0].getAttribute('class')).not.toContain('Mui-selected');
        await page.keyboard.press('ArrowUp');
        expect(await errorRows[0].getAttribute('class')).toContain('Mui-selected');
        expect(await errorRows[1].getAttribute('class')).not.toContain('Mui-selected');
    });
});
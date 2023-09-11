import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '../../../testData/EM2.0/TC_C51661.json';

test.describe("C51664 Verify the Top 'Retry' option in the Error Dashboard by editing data in 'Edit retry data' tab", () => {
    test("C51664 Verify the Top 'Retry' option in the Error Dashboard by editing data in 'Edit retry data' tab", async ({io, page}) => {
        const id = await io.fillFormUI(C51661,"FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51661', id);
        const lastRun = page.getByText('Last run');
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        const val = await page.locator('.ace_editor').evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.setValue('{}');
        });
        expect(await page.locator(selectors.flowBuilderPagePO.EM2dot0PO.RETRY_JOBS_DROPDOWN).getAttribute('class')).toContain('Mui-disabled');
        expect(page.getByLabel("Before retrying, you must save your edits for each error in the batch. Click “Save & next” on this error to continue.")).toBeVisible();
    });
  });
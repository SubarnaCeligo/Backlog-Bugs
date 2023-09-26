import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51664 from '../../../testData/EM2.0/C51664.json';

test.describe("C51664 Verify the Top 'Retry' option in the Error Dashboard by editing data in 'Edit retry data' tab", () => {
    test("C51664 Verify the Top 'Retry' option in the Error Dashboard by editing data in 'Edit retry data' tab", async ({io, page}) => {
        const id = await io.fillFormUI(C51664,"FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51664', id);
        const lastRun = page.getByText('Last run');
        await lastRun.waitFor({state: 'visible', timeout: 180000});
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.addStep("Added {} in code editor");
        const val = await page.locator('.ace_editor').evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.setValue('{}');
        });
        await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.EM2dot0PO.RETRY_JOBS_DROPDOWN, 'class', 'Mui-disabled');
        expect(page.getByLabel("Before retrying, you must save your edits for each error in the batch. Click “Save & next” on this error to continue.")).toBeVisible();
    });
  });
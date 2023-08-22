import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '../../testData/EM2.0/TC_C51661.json';

test.describe("C51664 Verify the Top 'Retry' option in the Error Dashboard by editing data in 'Edit retry data' tab", () => {
    test.only("C51664 Verify the Top 'Retry' option in the Error Dashboard by editing data in 'Edit retry data' tab", async ({io, page}) => {
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
        await page.pause();
        expect(await page.locator('[data-test=retryJobs]').getAttribute('class')).toContain('Mui-disabled');
        await page.hover('[data-test=retryJobs]');
        await page.pause();
        
    });
  });
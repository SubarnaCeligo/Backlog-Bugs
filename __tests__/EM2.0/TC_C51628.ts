import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '../../testData/EM2.0/TC_C51661.json';

test.describe("C51628 Verify the displayed buttons by editing the retry data in the 'Error details' drawer>'Edit retry data'tab", () => {
  test.only("C51628 Verify the displayed buttons by editing the retry data in the 'Error details' drawer>'Edit retry data'tab", async ({io, page}) => {
      const id = await io.fillFormUI(C51661,"FLOWS");
      await io.api.runBatchFlowViaAPI('TC_C51661', id);
      const lastRun = page.getByText('Last run');
      await lastRun.waitFor({state: 'visible'});
      await page.getByText("1 error").nth(1).click();
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.RETRY_AND_NEXT);
      expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.RETRY_AND_NEXT)).toBe(true);
      expect(await io.flowBuilder.isVisible('[data-test=saveRetryAndNext]')).toBe(false);
      await page.locator('.ace_editor').evaluate(e => {
        // @ts-ignore
        const editor = ace.edit(e);
        return editor.setValue('{}');
      });
      expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.RETRY_AND_NEXT)).toBe(false);
      expect(await io.flowBuilder.isVisible('[data-test=saveRetryAndNext]')).toBe(true);
  });
});
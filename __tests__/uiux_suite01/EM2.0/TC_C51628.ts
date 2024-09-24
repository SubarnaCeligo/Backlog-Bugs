import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51628 from '@testData/EM2.0/C51628.json';

test.describe("C51628 Verify the displayed buttons by editing the retry data in the 'Error details' drawer>'Edit retry data'tab", () => {
  let id
  test.afterEach(async ({ io }) => {
      await io.api.deleteFlowsWithId(id)
  });
  test("@Zephyr-IO-T19780 @Env-All C51628 Verify the displayed buttons by editing the retry data in the 'Error details' drawer>'Edit retry data'tab", async ({io, page}) => {
      id = await io.createResourceFromAPI(C51628,"FLOWS");
      await io.api.runBatchFlowViaAPI('TC_C51628', id);
      const lastRun = page.getByText('Last run');
      await lastRun.waitFor({state: 'visible', timeout: 360000});
      await io.flowBuilder.clickByTextByIndex("1 error", 1);
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_AND_NEXT);
      expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_AND_NEXT)).toBe(true);
      expect(await io.flowBuilder.isVisible(selectors.basePagePO.SAVE_AND_CLOSE)).toBe(false);
      await io.flowBuilder.addStep("Added {} in code editor");
      await page.locator('.ace_editor').evaluate(e => {
        // @ts-ignore
        const editor = ace.edit(e);
        return editor.setValue('{}');
      });
      let isRetryAndNextVisible = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_AND_NEXT);
      let isSaveAndCloseVisible = await io.flowBuilder.isVisible(selectors.basePagePO.SAVE_RETRY_AND_CLOSE)
      await io.assert.expectToBeValue("false", isRetryAndNextVisible.toString(), "Retry and next is visible");
      await io.assert.expectToBeValue("true", isSaveAndCloseVisible.toString(), "Save and Close is not visible");
  });
});
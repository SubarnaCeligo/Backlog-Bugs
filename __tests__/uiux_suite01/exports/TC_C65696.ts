import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C65969 from '@testData/Flows/C65969.json';

test.describe("C65696 Verify Preview call works fine When user clicks on preview continuously for 5 times", () => {
  test("@Env-All @Zephyr-IO-T24348 C65696 Verify Preview call works fine When user clicks on preview continuously for 5 times", async ({io, page}) => {
      await io.createResourceFromAPI(C65969, "FLOWS");
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
      await io.flowBuilder.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
      await io.flowBuilder.fill(selectors.exportsPagePO.HTTP_FILE_URL_PATH,'path,,PATH');

      await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
      await io.flowBuilder.waitForElementAttached(selectors.basePagePO.MUI_CIRCULAR_PROGRESS);
      await io.flowBuilder.waitForElementAttached('text="Parsed output"');
      let editorContent = JSON.parse(await page.locator(selectors.basePagePO.ACE_EDITOR_ID).evaluate(e => {
        // @ts-ignore
        const editor = ace.edit(e);
        return editor.getValue();
      }));
      let editorContentKeys = Object.keys(editorContent);
      let isPageOfRecords = editorContentKeys.includes('page_of_records');
      await io.assert.expectToBeTrue(isPageOfRecords, 'Data did not load properly after preview');

      await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
      await io.flowBuilder.waitForElementAttached(selectors.basePagePO.MUI_CIRCULAR_PROGRESS);
      await io.flowBuilder.waitForElementAttached('text="Parsed output"');
      editorContent = JSON.parse(await page.locator(selectors.basePagePO.ACE_EDITOR_ID).evaluate(e => {
        // @ts-ignore
        const editor = ace.edit(e);
        return editor.getValue();
      }));
      editorContentKeys = Object.keys(editorContent);
      isPageOfRecords = editorContentKeys.includes('page_of_records');
      await io.assert.expectToBeTrue(isPageOfRecords, 'Data did not load properly after preview');
  });
});
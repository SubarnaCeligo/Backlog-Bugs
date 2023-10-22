
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C27545 from '../../../testData/Flows/C27545.json'

test.describe("C27545 Sensitive information is not getting masked in the export preview panel.", () => {
  test("C27545 Sensitive information is not getting masked in the export preview panel.", async ({io, page}) => {
      await io.fillFormUI(C27545, "FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
      await io.flowBuilder.click(selectors.exportsPagePO.HTTP_BODY);
      let editorContent = JSON.parse(await page.locator(selectors.exportsPagePO.DATA_ACE_EDITOR).evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.getValue();
        }));
        const encrypted = editorContent.connection.http.encrypted;
        const encryptedChars = encrypted.split('');
        encryptedChars.map(async encryptedChar => {
          await io.assert.expectToBeValue(encryptedChar, '*', 'All the characters are not encrypted');
        });
  });
});

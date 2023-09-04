import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C48963 from '../../../testData/Flows/C48963.json';

test.describe("C48963 Verify 'Actions to take if source value not found' options functionality for ObjectArray Data type", () => {
  test("C48963 Verify 'Actions to take if source value not found' options functionality for ObjectArray Data type", async ({io, page}) => {
      await io.fillFormUI(C48963, "FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
      await page.getByLabel("Settings").nth(3).click();
      await io.importsPage.click(selectors.mappings.Mapper2dot0PO.DEFAULT_MAPPING);
      await io.importsPage.click(selectors.mappings.Mapper2dot0PO.USE_NULL);
      await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.importsPage.waitForElementAttached(selectors.mappings.Mapper2dot0PO.PREVIEW);
      await io.importsPage.click(selectors.mappings.Mapper2dot0PO.PREVIEW);
      await io.importsPage.delay(1000);
      const val = JSON.parse(await page.locator(selectors.mappings.Mapper2dot0PO.RESULT).evaluate(e => {
        // @ts-ignore
        const editor = ace.edit(e);
        return editor.getValue();
      }));

      expect(val.company).toBe(null);

  });
});
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C48963 from '../../../testData/Flows/C48963.json';

test.describe("C44937 Verify 'Actions to take if source value not found' options functionality for NUMBER ARRAY with Hardcode mapping", () => {
  test("C44937 Verify 'Actions to take if source value not found' options functionality for NUMBER ARRAY with Hardcode mapping", async ({io, page}) => {
      await io.fillFormUI(C48963, "FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
      await page.getByLabel("Settings",{exact:true}).nth(4).click();
      await io.importsPage.click(selectors.mappings.Mapper2dot0PO.MAPPING_TYPE);
      await io.importsPage.click(selectors.mappings.Mapper2dot0PO.HARDCODED_OPTION);
      await io.importsPage.fill(selectors.mappings.Mapper2dot0PO.HARDCODED_DEFAULT_INPUT, 'test_company');
      await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.importsPage.waitForElementAttached(selectors.mappings.Mapper2dot0PO.PREVIEW);
      await io.importsPage.click(selectors.mappings.Mapper2dot0PO.PREVIEW);
      await io.importsPage.delay(2000);
      const val = JSON.parse(await page.locator(selectors.mappings.Mapper2dot0PO.RESULT).evaluate(e => {
        // @ts-ignore
        const editor = ace.edit(e);
        return editor.getValue();
      }));

      expect(val.company).toBe('test_company');

  });
});


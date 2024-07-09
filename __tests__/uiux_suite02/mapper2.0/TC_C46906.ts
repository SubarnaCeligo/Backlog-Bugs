import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C46906 from '@testData/Mapper2.0/C46906.json';

test.describe("C46906 Verify by adding the duplicate mappings for 'destination record' and  do not enter the  'Source record field' value for one of the mapping  in Mapper2.0", () => {
  test("@Env-All C46906 Verify by adding the duplicate mappings for 'destination record' and  do not enter the  'Source record field' value for one of the mapping  in Mapper2.0", async ({io, page}) => {
      const id = await io.createResourceFromAPI(C46906, "FLOWS");
      await page.locator(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR).nth(1).click();
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
      await io.homePage.loadingTime()
      await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, 'test');
      await io.homePage.loadingTime()
      await page.click(selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS);
      await page.click(selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS);
      await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(1).fill('test');
      await io.importsPage.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE);

      await io.assert.verifyElementText(
        selectors.flowGroupingPagePO.ALERT_MESSAGE,
        "Mapper 2.0: Duplicate destination field(s): test"
      );
      await io.api.deleteFlowViaAPI(id);
      
  });
});

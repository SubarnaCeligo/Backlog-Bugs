import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C48963 from '@testData/Flows/C48963.json';

test.describe("C48963 Verify 'Actions to take if source value not found' options functionality for ObjectArray Data type", () => {
  test("@Env-All @Zephyr-IO-T18087 C48963 Verify 'Actions to take if source value not found' options functionality for ObjectArray Data type", async ({io, page}) => {
      await io.createResourceFromAPI(C48963, "FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
      await page.getByLabel("Settings").nth(3).click();
      await io.importsPage.click(selectors.mappings.MAPPER2DOT0PO.DEFAULT_MAPPING);
      await io.importsPage.click(selectors.mappings.MAPPER2DOT0PO.USE_NULL);
      await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.homePage.loadingTime()
      await io.importsPage.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
      await page.dblclick(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
      await io.importsPage.delay(2000);
      await io.homePage.loadingTime()
      let result = await page.locator(selectors.mappings.MAPPER2DOT0PO.RESULT + " .ace_content").textContent()
      let companyvalue = JSON.parse(result)
      expect(companyvalue.company).toBe(null);

  });
});
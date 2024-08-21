import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C48963 from '@testData/Flows/C48963.json';

test.describe("C49462 Dynamic lookup should not be shown for fileproviders", () => {
  test("@Env-All @Zephyr-IO-T18092 @Priority-P2 C49462 Dynamic lookup should not be shown for fileproviders", async ({io, page}) => {
      await io.createResourceFromAPI(C48963, "FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
      await io.flowBuilder.loadingTime();
      await page.locator(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS).nth(0).click();
      await io.flowBuilder.loadingTime();
      await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE);
      await io.flowBuilder.loadingTime();
      await expect(page.getByText("lookup - dynamic")).not.toBeVisible();
  });
});

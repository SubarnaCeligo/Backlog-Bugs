import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T9416 from '@testData/Mapper2.0/T9416.json';

test.describe("C53094 Verify the search with 100+ mappings", () => {
  test("@Env-All @Zephyr-IO-T9416 @Priority-P2 C53094 Verify the search with 100+ mappings", async ({io, page}) => {
      await io.createResourceFromAPI(T9416, "FLOWS");

      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

      await io.homePage.loadingTime();

      await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SEARCH);
      await page.getByLabel("Search destination fields").fill("files");
      io.homePage.addStep("Filled 'files' in search field");

      await io.homePage.loadingTime();
      
      await expect(page.getByText("1 match").first()).toBeVisible();

      await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.ADD_FIELD_MAPPING);

      await io.homePage.loadingTime();
  });
});

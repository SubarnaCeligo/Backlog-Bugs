import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C48963 from '@testData/Flows/C48963.json';

test.describe("C51306 Verify the number of matches found in search bar in mapper2.0 page", () => {
  test("@Env-All @Zephyr-IO-T22417 @Priority-P2 C51834 Verify the number of matches found in search bar in mapper2.0 page", async ({io, page}) => {
      await io.createResourceFromAPI(C48963, "FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
      
      await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SEARCH);
      await page.getByLabel("Search destination fields").fill("company");
      io.homePage.addStep("Filled 'company' in search field");
      
      await expect(page.getByText("1 match").first()).toBeVisible();
  });
});

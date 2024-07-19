import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C48963 from '@testData/Flows/C48963.json';

test.describe("C49462 Dynamic lookup should not be shown for fileproviders", () => {
  test("@Env-All @Zephyr-IO-T18092 @Priority-P2 C49462 Dynamic lookup should not be shown for fileproviders", async ({io, page}) => {
      await io.createResourceFromAPI(C48963, "FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

      await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.MAPPER2SEARCH);

      await io.homePage.fill(selectors.mappings.MAPPER2DOT0PO.SEARCH_INPUT, "company");

      await io.assert.verifyElementDisplayedByText(
        "Adding a row closes search mode",
        "Text is not displayed"
     );
  });
});

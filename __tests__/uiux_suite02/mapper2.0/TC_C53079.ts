import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C48963 from '@testData/Flows/C48963.json';

test.describe("C53079 Verify the info text in search bar", () => {
  test("@Env-All @Zephyr-IO-T9420 @Priority-P2 C53079 Verify the info text in search bar", async ({io, page}) => {
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

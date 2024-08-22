import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C48963 from '@testData/Flows/C48963.json';

test.describe("C52079 Verify the mappings when user has multiple sources configured and selected mapped fields filter( when no matches found in the source tabs)", () => {
  test("@Env-All @Zephyr-IO-T22520 @Priority-P2 C52079 Verify the mappings when user has multiple sources configured and selected mapped fields filter( when no matches found in the source tabs)", async ({io, page}) => {
      await io.createResourceFromAPI(C48963, "FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.click(
        selectors.flowBuilderPagePO.OPENAI.MAPPER2FILTER
      );
      await io.homePage.clickByText("Mapped fields");
      await io.flowBuilder.loadingTime();
      await io.homePage.clickByText("Apply");
      await io.flowBuilder.loadingTime();

      await io.assert.verifyElementDisplayedByText(
        "Filtered by mapped fields (clear filter to enable editing)",
      "Text is not displayed"
    );
  });
});

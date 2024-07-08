import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C48963 from '@testData/Flows/C48963.json';

test.describe("C51834 Verify whether beta label is removed in UI for mapper2.0 toggle", () => {
  test("@Env-All @Zephyr-IO-T22452 @Priority-P2 C51834 Verify whether beta label is removed in UI for mapper2.0 toggle", async ({io, page}) => {
      await io.createResourceFromAPI(C48963, "FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
      
      const isBetaTagDisplayed = await io.flowBuilder.isVisible('text="beta"');
      await io.assert.expectToBeFalse(isBetaTagDisplayed, "There is no beta label");

  });
});

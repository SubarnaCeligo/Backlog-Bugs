import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C9466 from "@testData/Flows/C9466.json"

test.describe("C9466 Metadata for 'PriceBook' record type is not available during Netsuite import flow", () => {
  test("@Env-All @Zephyr-IO-T2725 C9466 Metadata for 'PriceBook' record type is not available during Netsuite import flow", async ({io, page}) => {
      await io.createResourceFromAPI(C9466,"FLOWS");
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
      await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
      await io.flowBuilder.click(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_GENERATE);
      await io.assert.verifyElementIsDisplayed(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_GENERATE_ID, 'mapping options not displayed');
  });
});
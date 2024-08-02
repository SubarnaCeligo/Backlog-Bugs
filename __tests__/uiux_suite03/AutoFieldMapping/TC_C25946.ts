import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data4 from "@testData/Flows/C25947.json";

test.describe(`C25946 Verify suggested mapping separation boundary must be Cleared on mapping changes`, () => {
  test(`@Env-All @Zephyr-IO-T5273 C25946 Verify suggested mapping separation boundary must be Cleared on mapping changes`, async ({
    io
  }) => {
    const id = await io.createResourceFromAPI(data4, "FLOWS");
    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.click(selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP);
    const separationBoundary = await io.flowBuilder.isVisible(
      selectors.mappings.DEFAULT_MAPPING_TYPE.NEW_MAPPINGS
    );
    await io.assert.expectToBeValue(
      separationBoundary.toString(),
      "true",
      "Element not found"
    );
  });
});
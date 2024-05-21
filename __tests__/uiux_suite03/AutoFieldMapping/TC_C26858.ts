import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data4 from "@testData/Flows/C25947.json"

test.describe(`C26858 Verify if message There are no new fields to auto-map is shown in case no more additional fields are suggested`, () => {
  test(`@Zephyr-IO-T5280 C26858 Verify There are no new fields to auto-map is shown in case no more additional fields are suggested`, async ({
    io
  }) => {
    const id = await io.createResourceFromAPI(data4, "FLOWS");
    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.click(selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP);
    await io.flowBuilder.click(selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP);

    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION_ID, "There are no new fields to auto-map.")
  });
});
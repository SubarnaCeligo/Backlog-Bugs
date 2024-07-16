import { test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C45351 from '../../../testData/inputData/Mapper2.0/C45351.json';

test.describe("C45351 Verify the names of the 'Source field' and 'Destination field' in the description of the error alerts in Mapper2.0", () => {
  test("@Env-All @Zephyr-IO-T2395 C45351 Verify the names of the 'Source field' and 'Destination field' in the description of the error alerts in Mapper2.0", async ({io, page}) => {
    const id = await io.createResourceFromAPI(C45351, 'FLOWS');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR)
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, 'abc');
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, 'def');
    await io.homePage.loadingTime()
    await page.click(selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS);
    await page.click(selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS);
    await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, 'abc', 1);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.assert.verifyElementText(
      selectors.flowGroupingPagePO.ALERT_MESSAGE,
      "Mapper 2.0: One or more destination field values not entered."
    );
    await io.api.deleteFlowViaAPI(id);
  });
});
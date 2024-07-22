import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/T22389.json";

test.describe(`T22340 - Verify the mapping row should show (E) symbol beside the settings gear when user add value in source UI_Backlog`, () => {
    test.describe.configure({ retries: 2 })
    test(`@Env-All @Zephyr-IO-T22340 @Priority-P2 T22340 Verify the mapping row should show (E) symbol beside the settings gear when user add value in source UI_Backlog`, async ({
      io,
      page
    }) => {
      await io.createResourceFromAPI(testData, "FLOWS");
      await io.connectionPage.addStep("Flow created");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
      await io.flowBuilder.loadingTime();
      
      await io.flowBuilder.clickByIndex(selectors.mappings.MAPPER2DOT0PO.ADD, 1);
      await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, '123', 2);
      await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, '123', 2);

      await io.flowBuilder.clickByIndex(selectors.mappings.MAPPER2DOT0PO.ADD, 2);
      await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, 'abc', 3);
      await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, 'abc', 3);

      await io.flowBuilder.clickByIndex(selectors.mappings.MAPPER2DOT0PO.ADD, 3);
      await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, '{{test}}', 4);
      await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, '{{test}}', 4);

      await io.flowBuilder.clickByIndex(selectors.mappings.MAPPER2DOT0PO.ADD, 4);
      await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, '[index1, index2]', 5);
      await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, '[index1, index2]', 5);

      await io.flowBuilder.click(selectors.basePagePO.SAVE);

      const eSymbols = await page.locator(selectors.flowBuilderPagePO.E_SYMBOL);
      expect(eSymbols).toHaveCount(4);

      const mappingsList = await page.locator(selectors.flowBuilderPagePO.MAPPINGS_AREA);

      expect(await mappingsList.screenshot()).toMatchSnapshot("T22340.png", {maxDiffPixelRatio: 0.2 });
    });
  });
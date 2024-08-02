import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C48963 from '@testData/Flows/C48963.json';

test.describe("C52135 Verify Source field data type is displayed and must be able to select with different browsers Firefox, Chrome, Safari", () => {
  test("@Env-All @Zephyr-IO-T22498 @Priority-P2 C52135 Verify Source field data type is displayed and must be able to select with different browsers Firefox, Chrome, Safari", async ({io, page}) => {
      await io.createResourceFromAPI(C48963, "FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

      await io.flowBuilder.loadingTime();
      await page.getByLabel("Settings",{exact:true}).nth(4).click();

      const checkDataType = (await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.DATATYPE)).toString();
      await io.assert.expectToContainValue(
        checkDataType,
        "string",
        "Data type is wrong"
      );
  });
});

import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C46914.json";

test.describe(`C46914 Verify When no saved mappings exist, add empty parent row for output to be of 'rows' type`, () => {
  test(`C46914 Verify When no saved mappings exist, add empty parent row for output to be of 'rows' type`, async ({
    io,
    page
  }) => {
    const id = await io.fillFormUI(testData, "FLOWS");
    await io.api.runBatchFlowViaAPI("C46914", id);
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.waitForElementAttached(
      selectors.mappings.Mapper2dot0PO.CHANGEOUTPUTFORMAT
    );
    await io.flowBuilder.click(
      selectors.mappings.Mapper2dot0PO.CHANGEOUTPUTFORMAT
    );
    await io.flowBuilder.clickByText(
      "Create destination rows [ ] from source record { }"
    );
    const destinationFieldsCount = await page
      .locator(selectors.mappings.Mapper2dot0PO.DESTINATIONFIELDS)
      .count();
    const sourceFieldsCount = await page
      .locator(selectors.mappings.Mapper2dot0PO.SOURCEFIELDS)
      .count();

    await io.assert.expectToBeValue(
      "2",
      String(destinationFieldsCount),
      "Destination Fields count is not 2"
    );
    await io.assert.expectToBeValue(
      "2",
      String(sourceFieldsCount),
      "Source Fields count is not 2"
    );
  });
});

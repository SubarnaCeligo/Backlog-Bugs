import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C46914.json";

test.describe(`C46914 Verify When no saved mappings exist, add empty parent row for output to be of 'rows' type`, () => {
  test(`C46914 Verify When no saved mappings exist, add empty parent row for output to be of 'rows' type`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.clickByText("Automation Flows");
    const testCase = page.getByText("C46914").first();
    try {
      await testCase.waitFor({ state: "visible", timeout: 5000 });
      await testCase.click();
    } catch {
      const id = await io.fillFormUI(testData, "FLOWS");
      await io.api.runBatchFlowViaAPI("C46914", id);
    }
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.waitForElementAttached(
      selectors.mappings.Mapper2dot0PO.CHANGEOUTPUTFORMAT
    );
    await io.flowBuilder.click(
      selectors.mappings.Mapper2dot0PO.CHANGEOUTPUTFORMAT
    );
    await io.flowBuilder.clickByText(
      "Create destination rows [ ] from source rows [ ]"
    );
    const destinationFieldsCount = await page
      .locator(selectors.mappings.Mapper2dot0PO.DESTINATIONFIELDS)
      .count();
    const sourceFieldsCount = await page
      .locator(selectors.mappings.Mapper2dot0PO.SOURCEFIELDS)
      .count();
    expect(destinationFieldsCount).toBe(2);
    expect(sourceFieldsCount).toBe(2);
  });
});

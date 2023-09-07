import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C46914.json";

test.describe(`C46914 Verify When no saved mappings exist, add empty parent row for output to be of 'rows' type`, () => {
  test(`C46914 Verify When no saved mappings exist, add empty parent row for output to be of 'rows' type`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.homePage.addStep("Navigated to Automation Flows");
    try {
      const testCase = page.getByText("C46914").first();
      await testCase.waitFor({ state: "visible", timeout: 5000 });
      await testCase.click();
      await io.homePage.addStep("Clicked on 'C46914'");
    } catch {
      const id = await io.fillFormUI(testData, "FLOWS");
      await io.homePage.addStep("Created new flow 'C46914'");
      await io.api.runBatchFlowViaAPI("C46914", id);
      await io.homePage.addStep("Ran flow 'C46914' via API");
    }
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.addStep("Clicked on 'Plus button'");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.addStep("Clicked on 'Import Mappings'");
    await io.flowBuilder.waitForElementAttached(
      selectors.mappings.Mapper2dot0PO.CHANGEOUTPUTFORMAT
    );
    await io.flowBuilder.click(
      selectors.mappings.Mapper2dot0PO.CHANGEOUTPUTFORMAT
    );
    await io.flowBuilder.addStep("Clicked on 'Change Output Format'");
    await io.flowBuilder.clickByText(
      "Create destination rows [ ] from source record { }"
    );
    await io.flowBuilder.addStep(
      "Clicked on 'Create destination rows from source record'"
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
    expect(sourceFieldsCount).toBe(2);
    await io.assert.expectToBeValue(
      "2",
      String(sourceFieldsCount),
      "Source Fields count is not 2"
    );
  });
});

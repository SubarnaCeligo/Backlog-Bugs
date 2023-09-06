import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C51986.json";

test.describe(`C51986 Verify vertical line must be added to source row`, () => {
  test(`C51986 Verify vertical line must be added to source row`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.flowBuilder.clickByText("Automation Flows");
    const testCase = page.getByText("C51986").first();
    try {
      await testCase.waitFor({ state: "visible", timeout: 5000 });
      await testCase.click();
    } catch {
      const id = await io.fillFormUI(testData, "FLOWS");
      await io.api.runBatchFlowViaAPI("C51986", id);
    }
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    const sourceFieldDropdown = page.locator(
      selectors.mappings.Mapper2dot0PO.SOURCEFIELDS
    );
    await sourceFieldDropdown.waitFor({ state: "visible" });
    await expect(sourceFieldDropdown).toHaveScreenshot();
  });
});

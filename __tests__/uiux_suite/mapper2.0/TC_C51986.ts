import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C51986.json";

test.describe(`C51986 Verify vertical line must be added to source row`, () => {
  test(`C51986 Verify vertical line must be added to source row`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    const id = await io.fillFormUI(testData, "FLOWS");
    await io.api.runBatchFlowViaAPI("C51986", id);
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.addStep("Clicked on 'Plus button'");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    const sourceFieldDropdown = page.locator(
      selectors.mappings.Mapper2dot0PO.SOURCEFIELDS
    );
    await sourceFieldDropdown.waitFor({ state: "visible" });
    await expect(sourceFieldDropdown).toHaveScreenshot();
    await io.flowBuilder.addStep("Verified vertical line is added to source row");
  });
});

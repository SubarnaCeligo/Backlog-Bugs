import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C44396.json";

test.describe(`C44396 Verify the type of field mapping should be displayed for the row which are configured with lookup , hardcode , handlebars`, () => {
  test(`C44396 Verify the type of field mapping should be displayed for the row which are configured with lookup , hardcode , handlebars`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.clickByText("Automation Flows");
    const testCase = page.getByText("C44396").first();
    try {
      await testCase.waitFor({ state: "visible", timeout: 5000 });
      await testCase.click();
    } catch {
      const id = await io.fillFormUI(testData, "FLOWS");
      await io.api.runBatchFlowViaAPI("C44396", id);
    }
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    const destinationField = page.locator(
      selectors.mappings.Mapper2dot0PO.DESTINATIONFIELDS
    );
    await destinationField.waitFor({ state: "visible" });
    await destinationField.click();
    const $destinationField = await destinationField.elementHandle();
    const $textarea = await $destinationField.$("textarea");
    await $textarea.fill(
      "C51986 Verify vertical line must be added to source rowC51986 Verify vertical line must be added to source rowC51986 Verify vertical line must be added to source row"
    );
    const heightBefore = (await destinationField.boundingBox()).height;
    await io.flowBuilder.click(selectors.mappings.Mapper2dot0PO.SOURCEFIELDS);
    const heightAfter = (await destinationField.boundingBox()).height;
    expect(heightBefore).toBeGreaterThan(heightAfter);
  });
});

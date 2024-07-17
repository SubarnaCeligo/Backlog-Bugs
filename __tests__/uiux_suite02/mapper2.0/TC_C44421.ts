import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C44421.json";

test.describe(`C44421 verify destination mapping filed dropdown with lengthy field name`, () => {
  test(`@Env-All @Zephyr-IO-T2423 C44421 verify destination mapping filed dropdown with lengthy field name`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
    await io.flowBuilder.clickByText("Automation Flows");
    const testCase = page.getByText("C44421").first();
    try {
      await testCase.waitFor({ state: "visible", timeout: 5000 });
      await testCase.click();
    } catch {
      const id = await io.createResourceFromAPI(testData, "FLOWS");
      await io.api.runBatchFlowViaAPI("C44421", id);
    }
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    const destinationField = page.locator(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS
    );
    await destinationField.waitFor({ state: "visible" });
    await destinationField.click();
    const $destinationField = await destinationField.elementHandle();
    const $textarea = await $destinationField.$("textarea");
    await $textarea.fill(
      "C51986 Verify vertical line must be added to source rowC51986 Verify vertical line must be added to source rowC51986 Verify vertical line must be added to source row"
    );
    const heightBefore = (await destinationField.boundingBox()).height;
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS);
    const heightAfter = (await destinationField.boundingBox()).height;
    expect(heightBefore).toBeGreaterThan(heightAfter);
  });
});

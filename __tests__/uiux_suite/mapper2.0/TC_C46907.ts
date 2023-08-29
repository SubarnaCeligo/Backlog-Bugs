import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C46907.json";

test.describe(`C46907 Verify the functionality by not providing a 'destination record field 'value in Mapper 2.0`, () => {
  test(`C46907 Verify the functionality by not providing a 'destination record field 'value in Mapper 2.0`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.clickByText("Automation Flows");
    const testCase = page.getByText("C46907").first();
    try {
      await testCase.waitFor({ state: "visible", timeout: 5000 });
      await testCase.click();
    } catch {
      const id = await io.fillFormUI(testData, "FLOWS");
      await io.api.runBatchFlowViaAPI("C46907", id);
    }
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    const sourceField = page.locator(
      selectors.mappings.Mapper2dot0PO.SOURCEFIELDS
    );
    await sourceField.waitFor({ state: "visible" });
    await sourceField.click();
    const $sourceField = await sourceField.elementHandle();
    const $textarea = await $sourceField.$("textarea");
    await $textarea.fill("test");
    await io.flowBuilder.click(
      selectors.mappings.Mapper2dot0PO.DESTINATIONFIELDS
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    expect(
      page.getByText(
        "Mapper 2.0: One or more destination field values not entered."
      )
    ).toBeVisible();
  });
});

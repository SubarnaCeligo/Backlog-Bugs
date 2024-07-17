import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C46907.json";

test.describe(`C46907 Verify the functionality by not providing a 'destination record field 'value in Mapper 2.0`, () => {
  test(`@Env-All @Zephyr-IO-T18018 C46907 Verify the functionality by not providing a 'destination record field 'value in Mapper 2.0`, async ({
    io,
    page
  }) => {
    const id = await io.createResourceFromAPI(testData, "FLOWS");
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    const sourceField = page.locator(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS
    );
    await sourceField.waitFor({ state: "visible" });
    await sourceField.click();
    const $sourceField = await sourceField.elementHandle();
    const $textarea = await $sourceField.$("textarea");
    await $textarea.fill("test");
    await io.flowBuilder.click(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    expect(
      page.getByText(
        "Mapper 2.0: One or more destination field values not entered."
      )
    ).toBeVisible();
  });
});

import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C44421.json";

test.describe(`C65721 Verify Home key should place cursor at the beginning of the field, End key at the end of the field in mapper 1.0 fields.`, () => {
  test(`C65721 Verify Home key should place cursor at the beginning of the field, End key at the end of the field in mapper 1.0 fields.`, async ({
    io,
    page
  }) => {
    await io.fillFormUI(testData, "FLOWS");
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.click(
      selectors.mappings.Mapper2dot0PO.MAPPER1DOT0BUTTON
    );
    // TODO replace: selectors.mappings.Mapper1dot0PO.SOURCE_RECORD_FIELD_FIRST
    await io.flowBuilder.click('[data-test="text-fieldMappingExtract-0"]');
    // TODO replace: selectors.mappings.Mapper1dot0PO.SOURCE_RECORD_FIELD_INPUT
    const inp = page.locator("#fieldMappingExtract-0 input").first();
    await inp.fill("test");
    await io.flowBuilder.addStep("Filled the input field with 'test'");
    await page.keyboard.press("Home");
    let cursorPosition = await inp.evaluate(
      (el: HTMLInputElement) => el.selectionStart
    );
    await io.assert.expectToBeValue(
      String(cursorPosition),
      "0",
      'Cursor position is not "0"'
    );
    await page.keyboard.press("End");
    cursorPosition = await inp.evaluate(
      (el: HTMLInputElement) => el.selectionStart
    );
    await io.assert.expectToBeValue(
      String(cursorPosition),
      "4",
      'Cursor position is not "4"'
    );
  });
});

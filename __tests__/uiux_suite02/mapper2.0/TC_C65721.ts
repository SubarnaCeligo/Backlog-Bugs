import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C44421.json";

test.describe(`C65721 Verify Home key should place cursor at the beginning of the field, End key at the end of the field in mapper 1.0 fields.`, () => {
  test(`@Env-All @Zephyr-IO-T22142 C65721 Verify Home key should place cursor at the beginning of the field, End key at the end of the field in mapper 1.0 fields.`, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.mappings.MAPPER1DOT0PO.SOURCE_RECORD_FIELD_FIRST
    );
    await io.flowBuilder.loadingTime();
    const inp = page
      .locator(selectors.mappings.MAPPER1DOT0PO.SOURCE_RECORD_FIELD_INPUT)
      .first();
    await inp.fill("test");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.addStep("Filled the input field with 'test'");
    await io.flowBuilder.loadingTime();
    await page.keyboard.press("Home");
    await io.flowBuilder.addStep("Pressed 'Home' key");
    let cursorPosition = await inp.evaluate(
      (el: HTMLInputElement) => el.selectionStart
    );
    await io.assert.expectToBeValue(
      String(cursorPosition),
      "0",
      'Cursor position is not "0"'
    );
    await page.keyboard.press("End");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.addStep("Pressed 'End' key");
    await io.flowBuilder.loadingTime();
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

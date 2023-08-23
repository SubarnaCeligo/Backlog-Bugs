import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C46908.json";

test.describe(`C46908 Verify the functionality by not providing a 'source record field 'value in Mapper 2.0 in case of non required field`, () => {
  test(`C46908 Verify the functionality by not providing a 'source record field 'value in Mapper 2.0 in case of non required field`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.clickByText("Automation Flows");
    const testCase = page.getByText("C46908").first();
    try {
      await testCase.waitFor({ state: "visible", timeout: 5000 });
      await testCase.click();
    } catch {
      const id = await io.fillFormUI(testData, "FLOWS");
      await io.api.runBatchFlowViaAPI("C46908", id);
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
    await $textarea.fill("test");
    await io.flowBuilder.click(selectors.mappings.Mapper2dot0PO.SOURCEFIELDS);
    await io.flowBuilder.click(selectors.mappings.Mapper2dot0PO.PREVIEW);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.delay(1000);
    const val = await page
      .locator(`${selectors.mappings.Mapper2dot0PO.PREVIEWRESULT}`)
      .evaluate(e => {
        // @ts-ignore
        const editor = ace.edit(e);
        return editor.getValue();
      });
    expect(val).toBe("{}");
  });
});

import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C46908.json";

test.describe(`C46908 Verify the functionality by not providing a 'source record field 'value in Mapper 2.0 in case of non required field`, () => {
  test(`@Env-All @Zephyr-IO-T18019 C46908 Verify the functionality by not providing a 'source record field 'value in Mapper 2.0 in case of non required field`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.homePage.addStep("Navigated to Automation Flows");
    try {
      const testCase = page.getByText("C46908").first();
      await testCase.waitFor({ state: "visible", timeout: 5000 });
      await testCase.click();
      await io.homePage.addStep("Clicked on 'C46908'");
    } catch {
      const id = await io.createResourceFromAPI(testData, "FLOWS");
      await io.homePage.addStep("Created new flow 'C46908'");
      await io.api.runBatchFlowViaAPI("C46908", id);
      await io.homePage.addStep("Ran flow 'C46908' via API");
    }
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.addStep("Clicked on 'plus button'");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.addStep("Clicked on 'Import Mappings'");
    const destinationField = page.locator(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS
    );
    await destinationField.waitFor({ state: "visible" });
    await destinationField.click();
    await io.flowBuilder.addStep("Clicked on 'Destination Fields'");
    const $destinationField = await destinationField.elementHandle();
    const $textarea = await $destinationField.$("textarea");
    await $textarea.fill(Math.random().toString(36).substring(7));
    await io.flowBuilder.addStep("Filled 'Destination Fields' with random text");
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS);
    await io.flowBuilder.addStep("Clicked on 'Source Fields'");
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.flowBuilder.addStep("Clicked on 'Preview'");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.addStep("Clicked on 'Save'");
    await io.flowBuilder.delay(1000);
    const val = await page
      .locator(`${selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT}`)
      .evaluate(e => {
        // @ts-ignore
        const editor = ace.edit(e);
        return editor.getValue();
      });
    expect(["{}", ""]).toContain(val);
    await io.flowBuilder.addStep("Verified 'Preview Result' is empty");
  });
});

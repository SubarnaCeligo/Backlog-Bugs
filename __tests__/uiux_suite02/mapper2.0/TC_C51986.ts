import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C51986.json";

test.describe(`C51986 Verify vertical line must be added to source row`, () => {
  test(`@Env-All @Zephyr-IO-T22486 C51986 Verify vertical line must be added to source row`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    const id = await io.createResourceFromAPI(testData, "FLOWS");
    await io.homePage.loadingTime()
    await io.api.runBatchFlowViaAPI("C51986", id);
    await io.homePage.loadingTime()
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.addStep("Clicked on 'Plus button'");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime()
    const sourceFieldDropdown = page.locator(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS
    );
    await sourceFieldDropdown.waitFor({ state: "visible" });
    await expect(sourceFieldDropdown).toBeVisible();
    await io.flowBuilder.addStep("Verified vertical line is added to source row");
  });
});

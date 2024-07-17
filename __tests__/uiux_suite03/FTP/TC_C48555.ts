import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C48555 Verify destination dropdown suggestions for mapper1.0 and mapper2.0`, () => {
  test(`@Env-All @Zephyr-IO-T18457 C48555 Verify destination dropdown suggestions for mapper1.0 and mapper2.0`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.homePage.loadingTime()
    await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "Mapping_DND")
    const testCase = page.getByText("Mapping_DND").first();
    await testCase.waitFor({ state: "visible", timeout: 18000 });
    await testCase.click();
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    // dynamic input value, selector not required
    await io.flowBuilder.waitForElementAttached('input[value="parent 2"]');
    await io.flowBuilder.click('input[value="parent 2"]');
    await io.assert.verifyElementDisplayedByText(
      "fax",
      "'Fax' destination dropdown option is not displayed"
    );
    await io.flowBuilder.clickByText("Mapper 1.0");
    await io.flowBuilder.click(
      selectors.mappings.MAPPER1DOT0PO.DESTINATION_INPUT
    );
    await expect(page.getByText("fax")).not.toBeVisible();
    await io.flowBuilder.addStep(
      'Verified "fax" destination dropdown option is not displayed'
    );
  });
});

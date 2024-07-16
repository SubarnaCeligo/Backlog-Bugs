import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C52754 Verify search functionality when user searches a child destination field`, () => {
  test(`@Env-All @Zephyr-IO-T1606 C52754 Verify search functionality when user searches a child destination field`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.homePage.loadingTime()
    await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "Mapping_DND")
    const testCase = page.getByText("Mapping_DND").first();
    await io.homePage.addStep("Clicked on Mapping_DND flow");
    await testCase.waitFor({ state: "visible", timeout: 18000 });
    await testCase.click();
    await page.getByLabel("Define options").nth(1).click();
    io.homePage.addStep("Clicked on mapping");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    // todo replace: selectors.mappings.MAPPER2DOT0PO.SEARCH
    await io.flowBuilder.click('[date-test="showSearch"]');
    await page.getByLabel("Search destination fields").fill("child 1");
    io.homePage.addStep("Filled 'child 1' in search field");
    // dynamic input value, selector not required
    await io.flowBuilder.waitForElementAttached('input[value="parent 2"]');
    await io.assert.verifyElementIsDisplayed(
      // dynamic input value, selector not required
      'input[value="parent 2"]',
      "Parent 2 is not displayed"
    );
  });
});

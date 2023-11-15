import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C30504 Verify export fields are populated for NS subrecord import mappings`, () => {
  test(`C30504 Verify export fields are populated for NS subrecord import mappings`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    const testCase = page.getByText("FTP_To_NS_DND").first();
    await testCase.waitFor({ state: "visible", timeout: 18000 });
    await testCase.click();
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.clickByText(
      "NS premium import - Items : Inventory Details (Subrecord)"
    );
    await io.flowBuilder.click(
      selectors.mappings.MAPPER1DOT0PO.DESTINATION_INPUT
    );
    await io.assert.verifyElementDisplayedByText(
      "Email Login Key",
      "'Email Login Key' destination dropdown option is not displayed"
    );
    await io.flowBuilder.addStep(
      "Verified export fields are populated for NS subrecord import mappings"
    );
  });
});

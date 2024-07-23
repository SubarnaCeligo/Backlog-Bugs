import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/FTP_To_NS.json";

test.describe(`C30504 Verify export fields are populated for NS subrecord import mappings`, () => {
  test(`@Env-All @Zephyr-IO-T1971 C30504 Verify export fields are populated for NS subrecord import mappings`, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.homePage.loadingTime()
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime()
    await page.getByText("(Subrecord)").click();
    await io.flowBuilder.addStep("Clicked on subrecord");
    await io.homePage.loadingTime()
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

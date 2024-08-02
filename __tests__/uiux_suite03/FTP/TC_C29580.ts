import { test, expect } from "@celigo/ui-core-automation";
import S3 from "@testData/FtpImport/C29580.json";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C29580 Verify when user opens an existing flow step, which does have  grouping implemented, the existing grouping feature is shown and greyed out", () => {
  test("@Env-All @Zephyr-IO-T11666 C29580 Verify when user opens an existing flow step, which does have  grouping implemented, the existing grouping feature is shown and greyed out", async ({
    io
  }) => {
    await io.createResourceFromAPI(S3, "FLOWS");
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.clickByText(
      "How would you like to group and sort records?"
    );
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Select...",
      "Select not available in group and sort records in export"
    );
  });
});

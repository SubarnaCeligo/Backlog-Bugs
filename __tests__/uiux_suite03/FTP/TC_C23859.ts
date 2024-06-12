import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/FtpImport/C23859.json";

test.describe("TC_C23859 Verify CSV Generator: All the fields are evaluating correctly", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("@Zephyr-IO-T11562 @Env-All C23859 Verify CSV Generator: All the fields are evaluating correctly", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + id
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
    await io.flowBuilder.clickByTextByIndex("CSV (or any delimited text file)", 1);
    await io.flowBuilder.addStep("Successfully selected the file type");
    await io.flowBuilder.click(selectors.mappings.COLUMNDELIMETEREXPORT);
    await page.keyboard.press('Tab');
    await io.flowBuilder.addStep("Successfully selected the Column Delimiter");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ROW_DELIMITER);
    await page.keyboard.press('Enter');
    await io.flowBuilder.addStep("Successfully selected the Row Delimiter");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.addStep("Successfully clicked on Save Button");
    await io.flowBuilder.click(selectors.basePagePO.CLOSE);
    await io.flowBuilder.addStep("Successfully clicked on Close Button");
  });
});

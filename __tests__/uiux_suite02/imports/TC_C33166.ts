import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Imports/C33166.json";

test.describe(`C33166 Verify save saveAndClose close button are present in footer for edit lookup page`, () => {
  test(`@Env-All C33166 Verify save saveAndClose close button are present in footer for edit lookup page`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
    await io.flowBuilder.clickByText("Automation Flows");
    const testCase = page.getByText("C33166").first();
    try {
      await testCase.waitFor({ state: "visible", timeout: 5000 });
      await testCase.click();
    } catch {
      const id = await io.createResourceFromAPI(testData, "FLOWS");
      await io.api.runBatchFlowViaAPI("C33166", id);
    }
    await page.getByText("Import").click();
    await page.getByText("Yes (advanced)").click();
    await expect(page.locator(selectors.basePagePO.SAVE)).toBeVisible();
    await expect(page.locator(selectors.basePagePO.SAVE_AND_CLOSE)).toBeVisible();
    await expect(page.locator(selectors.basePagePO.CLOSE)).toBeVisible();
  });
});

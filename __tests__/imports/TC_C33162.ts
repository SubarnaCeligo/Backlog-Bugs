import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Imports/C33162.json";

test.describe(`C33162 Verify save saveAndClose close button are present in footer for edit lookup page`, () => {
  test(`C33162 Verify save saveAndClose close button are present in footer for edit lookup page`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.clickByText("Automation Flows");
    const testCase = page.getByText("C33162").first();
    try {
      await testCase.waitFor({ state: "visible", timeout: 5000 });
      await testCase.click();
    } catch {
      const id = await io.fillFormUI(testData, "FLOWS");
      await io.api.runBatchFlowViaAPI("C33162", id);
    }
    await page.getByText("Import").click();
    await page.getByText("Yes (advanced)").click();
    await expect(page.locator(selectors.basePagePO.SAVE)).toBeVisible();
    await expect(page.locator(selectors.basePagePO.SAVE_AND_CLOSE)).toBeVisible();
    await expect(page.locator(selectors.basePagePO.CLOSE)).toBeVisible();
  });
});

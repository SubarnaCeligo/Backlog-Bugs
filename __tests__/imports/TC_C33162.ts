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
      const id = await io.fillForm(testData, "FLOWS");
      await io.api.runBatchFlowViaAPI("C33162", id);
    }
    await page.getByText("Import").click();
    await page.getByText("Yes (advanced)").click();
    await expect(page.getByText("Save")).toBeVisible();
    await expect(page.getByText("Save & close")).toBeVisible();
    await expect(page.getByText("Close")).toBeVisible();
  });
});

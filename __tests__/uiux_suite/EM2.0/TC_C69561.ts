import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51655 from "@testData/EM2.0/TC_C51655.json";

test.describe("C69561 Search bar is distorted on Error windows", () => {
  test("C69561 Search bar is distorted on Error windows", async ({
    io,
    page
  }) => {
    const errorFlowId = await io.fillFormUI(C51655, "FLOWS");
    await io.api.runBatchFlowViaAPI("TC_C51655", errorFlowId);
    const lastRun = page.getByText("Last run");
    await lastRun.waitFor({ state: "visible", timeout: 180000 });
    await io.flowBuilder.clickByTextByIndex("11 errors", 1);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS
    );
    await io.flowBuilder.addStep("Selecting the first error from the list");
    let errorRows = await page.$$(
      selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS
    );
    await io.assert.expectToBeValue(
      String(errorRows.length),
      "11",
      "Error rows count is not 11"
    );
    await io.flowBuilder.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "test"
    );
    await io.flowBuilder.delay(1000); // wait for the search to complete
    errorRows = await page.$$(
      selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS
    );
    await io.assert.expectToBeValue(
      String(errorRows.length),
      "0",
      "Error rows count is not 0"
    );
    await io.flowBuilder.addStep("Verified search is working as expected");
    await expect(page.getByPlaceholder("Search…")).toHaveScreenshot();
    await io.flowBuilder.addStep("Verified search bar is not distorted");
  });
});

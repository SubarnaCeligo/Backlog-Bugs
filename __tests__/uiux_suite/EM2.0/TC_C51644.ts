import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowJSON from "@testData/EM2.0/C51644.json"

test.describe(`C51644 Verify the error rows table header fields displayed in the New View`, () => {
  test(`C51644 Verify the error rows table header fields displayed in the New View`, async ({
    io,
    page
  }) => {
    // await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
    // await io.flowBuilder.clickByText("Automation Flows");
    // await io.flowBuilder.clickByText("mytestflow");
    const id = await io.fillFormUI(flowJSON, "FLOWS");
    await io.api.runBatchFlowViaAPI("C51644", id);
    const lastRun = page.getByText("Last run");
    await lastRun.waitFor({ state: "visible" });
    await page.getByText("1 error").nth(1).click();
    await expect(page.getByText("Message", { exact: true })).toBeVisible({
      timeout: 10000
    });
    await expect(page.getByText("Code", { exact: true })).toBeVisible();
    await expect(page.getByText("Source", { exact: true })).toBeVisible();
    await expect(page.getByText("Classification", { exact: true })).toBeVisible();
    await expect(page.getByText("Timestamp", { exact: true })).toBeVisible();
    await expect(page.getByText("Actions", { exact: true })).not.toBeVisible();
  });
});

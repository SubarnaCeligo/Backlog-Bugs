import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowJSON from "@testData/EM2.0/C51644.json"

test.describe(`C51644 Verify the error rows table header fields displayed in the New View`, () => {
  let id
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId(id)
  });
  test(`@Zephyr-IO-T19796 @Env-All C51644 Verify the error rows table header fields displayed in the New View`, async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(flowJSON, "FLOWS");
    await io.api.runBatchFlowViaAPI("C51644", id);
    const lastRun = page.getByText("Last run");
    await lastRun.waitFor({ state: "visible" ,timeout:360000});
    await io.flowBuilder.reloadPage()
    await io.flowBuilder.loadingTime()
    await page.getByText("1 error").nth(1).click();
    await expect(page.getByText("Message", { exact: true })).toBeVisible({
      timeout: 10000
    });
    await expect(page.getByText("Code", { exact: true })).toBeVisible();
    await expect(page.getByText("Source", { exact: true })).toBeVisible();
    await expect(page.getByText("Classification", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Timestamp" }).locator("div")
    ).toBeVisible();
    await expect(page.getByText("Actions", { exact: true })).not.toBeVisible();
  });
});

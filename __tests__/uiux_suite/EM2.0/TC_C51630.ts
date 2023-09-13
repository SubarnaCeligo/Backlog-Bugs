import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowJSON from "@testData/Em2.0/C51630.json";

test.describe(`C51630 Verify the "Previous" & "Next" options in the "Error details" drawer`, () => {
  test(`C51630 Verify the "Previous" & "Next" options in the "Error details" drawer`, async ({
    io,
    page
  }) => {
    // await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
    // await io.flowBuilder.clickByText("Automation Flows");
    // await io.flowBuilder.clickByText("mytestflow");
    const id = await io.fillFormUI(flowJSON, "FLOWS");
    await io.api.runBatchFlowViaAPI("C51630", id);
    const lastRun = page.getByText("Last run");
    await lastRun.waitFor({ state: "visible" });
    await page.getByText("1 error").nth(1).click();
    await expect(
      page.locator(selectors.flowBuilderPagePO.PREVIOUS_ERROR_BUTTON)
    ).toBeVisible();
    await expect(
      page.locator(selectors.flowBuilderPagePO.NEXT_ERROR_BUTTON)
    ).toBeVisible();
    await expect(
      page.locator(selectors.flowBuilderPagePO.PREVIOUS_ERROR_BUTTON)
    ).toBeDisabled();
  });
});

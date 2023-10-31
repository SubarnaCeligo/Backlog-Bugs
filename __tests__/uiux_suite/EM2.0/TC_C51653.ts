import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/EM2.0/C51653.json"


test.describe(`C51653 Verify the height and the veritical scroll bar of the message coloumn in the "Error rows" panel`, () => {
  test(`C51653 Verify the height and the veritical scroll bar of the message coloumn in the "Error rows" panel`, async ({
    io,
    page
  }) => {
    // await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
    // await io.flowBuilder.clickByText("Automation Flows");
    // await io.flowBuilder.clickByText("mytestflow");
    const id = await io.createResourceFromAPI(testData.flow, "FLOWS");
    await io.api.runBatchFlowViaAPI("C51653", id);
    const lastRun = page.getByText("Last run");
    await lastRun.waitFor({ state: "visible" });
    await page.getByText("1 error").nth(1).click();
    const errorMessageDiv = page.getByText(testData.errorText);
    const heightBefore = (await errorMessageDiv.boundingBox()).height;
    await errorMessageDiv.evaluate((e, newText) => {
      e.textContent = newText;
    }, testData.newText);
    const heightAfter = (await errorMessageDiv.boundingBox()).height;
    expect(heightAfter).toBeGreaterThan(heightBefore);
  });
});

import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Flows/C59979.json";

test.describe(`C59979 To verify that the FlowBuilder should work as expected.`, () => {
  test(`C59979 To verify that the FlowBuilder should work as expected.`, async ({
    io,
    page
  }) => {
    const id = await io.fillForm(testData, "FLOWS");
    await io.api.runBatchFlowViaAPI("C59979", id);
    const lastRun = page.getByText("Last run");
    try {
      await lastRun.waitFor({ state: "visible", timeout: 20000 });
    } catch (error) {
      console.log("error", error);
    }
    await expect(lastRun).toBeVisible();
  });
});

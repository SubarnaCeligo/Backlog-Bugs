import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowJSON from "@testData/EM2.0/C51302.json"
import { randomString, randomNumber } from "@celigo/aut-utilities";

test.describe(`C51302 Verify when a retry is in progress and “Cancel” is clicked, few errors are successful and few errors are unsuccessful`, () => {
  let id
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId(id)
  });
  test(`@Env-All @Zephyr-IO-T23331 C51302 Verify when a retry is in progress and “Cancel” is clicked, few errors are successful and few errors are unsuccessful`, async ({
    io,
    page
  }) => {
    const flowName="C51302"+randomString(5)+randomNumber(2)
    flowJSON["name"]=flowName
    id = await io.createResourceFromAPI(flowJSON, "FLOWS");
    await io.api.runBatchFlowViaAPI(flowName, id);
    const lastRun = page.getByText("Last run");
    await lastRun.waitFor({ state: "visible" ,timeout:360000});
    await io.flowBuilder.clickByTextByIndex("1 error", 1);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_AND_NEXT
    );
    await io.flowBuilder.delay(1000); // https://celigo.atlassian.net/browse/IO-29218
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRIES_TAB);
    await io.flowBuilder.clickByTextByIndex("Cancel retry", 0);
    await io.flowBuilder.addStep("Clicked 'cancel retry'");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.CANCEL_RETRY_BUTTON
    );
    await page
      .getByText("Retry completed.")
      .first()
      .waitFor({ state: "visible" });
    const retryStatus = await page
      .getByText("Cancel retry")
      .first()
      .evaluate(e => e.parentElement.parentElement.firstElementChild.textContent);
    await io.assert.expectToBeValue(
      retryStatus,
      "Canceled",
      "Retry status is not canceled"
    );
  });
});

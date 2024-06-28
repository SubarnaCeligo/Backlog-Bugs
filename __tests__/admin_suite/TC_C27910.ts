import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Flow from "@testData/admin_suite/C27910.json";

test.describe("TC_C27910 Verify pre send hook retrying and retry data by sending errors field as empty and errorsAndRetryData having retry data and errors", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Zephyr-IO-T6329 @Env-All C27910 Verify pre send hook retrying and retry data by sending errors field as empty and errorsAndRetryData having retry data and errors", async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(Flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    let errors = await page.locator(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await errors.waitFor({state: 'visible', timeout: 500000});
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.dashboardPagePO.FA_FILTER_CHECKBOX, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.click(selectors.myAccountPagePO.SELECTED_ERROR);
    await io.flowBuilder.delay(1000 * 3 * 1);
    let retryingErrors = await page.getByText("Retrying errors...").nth(1);
    await retryingErrors.waitFor({state: 'visible', timeout: 500000});
    await io.assert.expectToBeTrue(await retryingErrors.isVisible(), 'Retrying errors is not visible');
    await io.flowBuilder.addStep("Able to retry errors of NetSuite");
  });
});

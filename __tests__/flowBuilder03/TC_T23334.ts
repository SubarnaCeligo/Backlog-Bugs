import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T23334 from "@testData/FlowBuilder/T23334.json";

test.describe("TC_T23334 Verify that ‘View results' indicator should disappear if a user refreshes the browser or logs out", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("@Zephyr-IO-T23334 @Env-All @Priority-P2 C108586 Verify that ‘View results' indicator should disappear if a user refreshes the browser or logs out", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(T23334, "FLOWS");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    let errors = page.locator(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await errors.waitFor({state: 'visible', timeout: 500000});
    await io.flowBuilder.clickByTextByIndex("1 error", 0);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_ALL_OPTION);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY);
    await io.flowBuilder.loadingTime();
    await io.homePage.reloadPage();
    await expect (await page.getByText("View results")).not.toBeVisible();
    });
});
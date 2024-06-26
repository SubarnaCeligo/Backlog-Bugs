import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T10044 from '@testData/flowbranching/TC_T10044.json';

test.describe("IO-T10044 Verify Retry is working as expected for imports with asynchelper with flow branching", () => {
  let id;
  test.afterEach(async ({ io, page }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test("@Priority-P2 @Zephyr-IO-T10044 @Env-All Verify Retry is working as expected for imports with asynchelper with flow branching", async ({ io, page }) => {
    id = await io.flowbranching.createFlowBranchFromAPI(T10044);
    await io.flowBuilder.navigateTo(
      process.env.IO_Integration_URL + "flowBuilder/" + id
    );
    await io.homePage.addStep("Running the flow");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 600000 });


    await io.connectionPage.addStep("Verifying that the flow ran with errors");
    await io.assert.verifyElementContainsText('tbody tr:nth-child(1) td:nth-child(5)', "Success");
    await io.assert.verifyElementContainsText('tbody tr:nth-child(2) td:nth-child(5)', "1 error");

    await io.flowBuilder.addStep('Clicking page processor hook');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPT_ID, 0);
    await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("Retrying the flow");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ERROR_BUBBLE);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ERROR_BUBBLE, 1);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_ALL_OPTION);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRIES_TAB);
    await page.getByText("Retry completed.")
      .first()
      .waitFor({ state: "visible", timeout: 600000 });
    await io.assert.verifyElementTextByIndex('tbody tr:nth-child(1) td:nth-child(7)', "Success", 1);
  });
});
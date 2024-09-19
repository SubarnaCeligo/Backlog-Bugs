
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";
import TC_C24483 from "@testData/EM2.0/TC_C24483.json";

test.describe("TC_C24483", () => {

  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7204 TC_C24483| Verify the retry dropdown with error table which has <50 errors", async ({ io, page }, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C24483);
    let flowId = flows.get(TC_C24483.name)["flowId"];

    await io.api.checkJobStatusFromAPI(
      TC_C24483.name,
      flowId,
      [5, 0, 5]
    );
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flowId
    );
    await io.homePage.isPageReady();
    await io.homePage.delay(10000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();

    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.ERROR_CHECKBOX, 1);
    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.ERROR_CHECKBOX, 3);

    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);

    var selectedErrorCount = await (
      await io.homePage.getText(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_SELECTED)
    ).toString()
      .replace(/\r?\n|\r/g, " ")
      .split(" ")[0];
    var allErrorText = await (
      (await io.homePage.getText(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_ALL)).toString()
    ).replace(/\r?\n|\r/g, " ");
    await io.assert.expectToBeValue(String(selectedErrorCount), "2", "");
    await io.assert.expectToBeValue(String(allErrorText), "All retriable errors", "");
  });
});

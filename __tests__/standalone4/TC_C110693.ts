
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C110693.json";

test.describe("TC_C110693_Checking_error_count_displayed_on_top_flow_builder_page", () => {
  let flowId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    await test.step("Delete created flows", async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("TC_C110693 @Env-All @Zepphyr-IO-T14169", async ({ io, page }, testInfo) => {
    flowId = await io.createResourceFromAPI(TC, "FLOWS");
    await test.step("*** Created Flows :" + TC.name, async () => { });
    await io.homePage.loadingTime();
    //Run Flow
    await io.api.checkJobStatusFromAPI(TC.name, flowId,
      [0, 0, 5]
    );
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const errorIcon = await page.locator(selectors.flowBuilderPagePO.ERROR_ICON).nth(1);
    await errorIcon.waitFor({ state: 'visible', timeout: 90000 });

    const notifications = await page.$$(selectors.flowBuilderPagePO.SNACKBAR_CLOSE_BUTTON);
    if (notifications.length > 0) {
      await page.waitForTimeout(70000);
    }
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ERROR_ICON, 0);
    test.step("*** Clicking on the error view button ***", async () => { });
    const notification = await page.locator(selectors.basePagePO.NOTIFICATION_ID);
    await notification.waitFor({ state: "visible", timeout: 10000 });

    let alertText = "All open errors in this flow are in this step.";
    var result = await io.homePage.getTextFromElement(
      selectors.basePagePO.NOTIFICATION_ID,
      alertText
    );
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Verified pop-up should show : 'All open errors in this flow are in this step' ***", async () => { });
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** clicking on close ***", async () => { });
    await io.homePage.loadingTime();

    const isRunHistoryVisible = await io.homePage.isVisible(selectors.flowBuilderPagePO.RUN_HISTORY);
    await io.assert.expectToBeTrue(isRunHistoryVisible, "");
    test.step("*** Verifying we are at old Flow Builder screen test.afterEach closing error view window by checking run history tab is present or not ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});

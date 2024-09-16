
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C110691.json";

test.describe("TC_C110691_Checking_error_count_displayed_on_Dashboard_page", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    await test.step("Delete created flows", async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("TC_C110691 @Env-All @Zephyr-IO-T14167", async ({ io, page }, testInfo) => {
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

    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    test.step("*** Opening the integration page ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.DASHBOARD);
    test.step("*** Opening the dashboard ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    test.step("*** Opening the completed flows page ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.dashboardPagePO.FA_FILTER_BUTTON);
    const filterValues = await page.$$(selectors.dashboardPagePO.FA_FILTER_VALUES);
    let element;
    for (let filterValue of filterValues) {
      let textContent = await filterValue.textContent();
      if (textContent.includes("TC_C110691")) {
        element = filterValue;
        break;
      }
    }
    await element.click();
    await io.homePage.click(selectors.basePagePO.APPLY_BUTTON_CUSTOM);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.myAccountPagePO.OPENERRORS);
    test.step("*** Clicking on the error view button ***", async ()=>{});
    const notification = await page.locator(selectors.basePagePO.NOTIFICATION_ID);
    await notification.waitFor({ state: "visible", timeout: 10000 });

    let alertText = "All open errors in this flow are in this step.";
    var result = await io.homePage.getTextFromElement(
      selectors.basePagePO.NOTIFICATION_ID,
      alertText
    );
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Error page gets opened and pop message shows up ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the error view window ***", async ()=>{});
    await io.homePage.loadingTime();
    let completedflowstab = await page.locator(
      selectors.flowBuilderPagePO.COMPLETED_FLOWS
    );
    await expect(await completedflowstab.isVisible()).toBeTruthy();
    test.step("*** Verifying we are at completed Flows tab screen test.afterEach closing error view window by checking completedflows tab is present or not ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});

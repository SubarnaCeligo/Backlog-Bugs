
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C110692.json";

test.describe("TC_C110692_Checking_error_view_from", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    await test.step("Delete created flows", async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("TC_C110692 @Zephyr-IO-T14168 @Env-All", async ({ io, page }, testInfo) => {
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

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    test.step("*** Opening the dashboard from left navigation bar ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    test.step("*** Opening the completed flows page ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.OPENERRORS);
    test.step("*** Clicking on the error view button ***", async ()=>{});
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

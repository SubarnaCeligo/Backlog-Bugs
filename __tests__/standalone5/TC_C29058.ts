
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/STANDALONE/TC_C28992.json";

test.describe("TC_C29058", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async () => { });
  });
  test("@Zephyr-IO-T6471 @Env-All TC_C29058", async ({io,page}, testInfo) => {
    flowId = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowId);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.loadingTime();

    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 180000 });

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    test.step("*** Clicked on Dashboard ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    test.step("*** Clicked on completed flows ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click("tbody > tr:nth-child(1) > th > a");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await page.locator("//button[text()='Flows']").isVisible();
    let flowsTab = await page.locator("//button[text()='Flows']").isVisible();
    await io.assert.expectToBeTrue(flowsTab, "");

    test.step("*** Redirected to the respective Integration tile - flows tab.  ***", async ()=>{});
  });
});

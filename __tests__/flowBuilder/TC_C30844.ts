import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C30844.json";

test.describe("TC_C30844", () => {
  let flowId,scriptId;

  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test.afterEach(async ({io}) => {
    test.step("*** Delete Flow Using UI***", async ()=>{});
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T2907|Fetching should pause on clicking pause", async ({io, page}) => {
    test.step("*** Creating Script **** ", async ()=>{});
    scriptId = await io.api.createScriptViaAPI( TC.script);
    TC.qa__api_tdata[0].pageGenerators[0].qa__export.hooks.preSavePage._scriptId = scriptId;

    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);  
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.RUNFLOW);
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 360000});
    await io.homePage.click(selectors.flowBuilderPagePO.SCRIPTS);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 1);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.VIEW_EXECUTION_LOGS);
    await io.homePage.loadingTime();
    await io.homePage.clickByText("Last 15 minutes");
    await io.homePage.loadingTime();
    await io.homePage.clickByText("Custom");
    await io.homePage.loadingTime();
    let todays = await page.$$(selectors.integrationPagePO.SELECTTODAY);
    let today;
    if (await todays[0].isEnabled()) today = todays[0];
    else today = todays[1];
    await today.isVisible();
    await today.click();
    
    await io.homePage.click(selectors.integrationPagePO.APPLYSELECTRANGE);
    await io.homePage.click(selectors.myAccountPagePO.PAUSEFETCH);
    const error = await io.homePage.getText(
      "[class='text-base font-regular flex items-center text-[#677A89]']"
    );
    await expect(error).toContain("Fetching paused... ");
await test.step(
      "*** Verified Fetching Pauses on clicking Pause. ***"
, async ()=>{});
  });
});

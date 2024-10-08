import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C30842.json";

test.describe("TC_C30842_C22949_C28456_C24479", () => {
  let  flowId;
  let scriptId;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });

  test.afterEach(async ({io}) => {
    test.step("*** Delete Flow Using UI***", async ()=>{});
    await io.api.deleteFlowViaAPI([flowId]);
    test.step("*** Delete Flow Using UI***", async ()=>{});
    await io.api.deleteScriptViaAPI(scriptId);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T2906|@Env-All @Zephyr-IO-T2866|@Env-All @Zephyr-IO-T2794|@Env-All @Zephyr-IO-T2805", async ({io, page}) => {
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

    // TC_C30842,IO-T2906 | Verify the fetching progress bar indicator is shown for script logs on FB page
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
    const msg = await io.homePage.getText(
      "[class='text-base font-regular flex items-center text-[#677A89]']"
    );
    await expect(msg).toContain("Fetching logs...");


   //  TC_C22949,IO-T2866 | Verify an indicator at the top shows the remaining debugger time for the set duration
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 2);
    await io.homePage.click(selectors.flowBuilderPagePO.DEBUG_CONNECTION);
    await io.homePage.loadingTime();
    expect (await page.getByText('15m remaining').isVisible()).toBeTruthy();

   //  TC_C28456,IO-T2974 | To verify debugger is not enabled automatically when test is manually turned off
    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RECORD_TYPE);
    await io.homePage.click(selectors.myAccountPagePO.DEBUGTIMEINTERVAL);
    const option = await page.$("[data-value='0']")
    await option.focus();
    await option.click();
    await io.homePage.clickByText("Apply");
    
    await io.homePage.click(selectors.flowBuilderPagePO.SCRIPTS);
    await io.homePage.click('[data-test="connectionLogs"]');

    await io.homePage.loadingTime();
    expect (await page.getByText("Start debug").isVisible()).toBeTruthy();
    await io.homePage.loadingTime();

    // TC_C24479,,IO-T2905 | Dashboard shows only latest job when we do "Run now" from connection debugger section
    await io.homePage.clickByIndex(
      // selectors.basePagePO.RUNFLOW,
      // 1
      '[aria-label="Run now"]',0
    );
    await io.homePage.loadingTime();
    const lastRun1 = page.getByText('Last run');
    await lastRun1.waitFor({state: 'visible', timeout: 360000});
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    await io.homePage.loadingTime();
    let newEntry = await io.homePage.getLengthOfElementArray("tr");
    expect(newEntry).toBeGreaterThan(1);
  });
});

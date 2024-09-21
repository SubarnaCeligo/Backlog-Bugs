import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C22942.json";

test.describe("TC_C22942 | TC_C23017", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId(flowId);
  });

  test("@Env-All @Zephyr-IO-T2788| Verify if there are no debug logs, download logs option is greyed out", async ({io,page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    test.step("*** Navigating to Flow Builder ***", async ()=>{});
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    test.step("*** Clicking on Connections ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    await io.homePage.loadingTime();
    test.step("*** Opening Debug Connections ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,1);
    await io.homePage.click(selectors.myAccountPagePO.DEBUG);
     await io.homePage.click(selectors.flowBuilderPagePO.CLEAR_LOGS);
     await io.homePage.click(selectors.flowBuilderPagePO.CLEAR_LOGS);
    const downloadLogs = await page.locator(selectors.myAccountPagePO.DOWNLOADLOGS);
    await test.step("*** Verifying if Download logs is disabled ***", async ()=>{});
    expect(await downloadLogs.isEnabled()).toBeFalsy();
  });

  test("@Env-All @Zephyr-IO-T2799| If the debugger is enabled while a flow is running, the debugger should show the logs", async ({io}) => {
    // Run the Flow
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    test.step("*** Navigating to Flow Builder ***", async ()=>{});
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.api.runBatchFlowViaAPI(TC.name,flowId,);
    test.step("*** Clicking on Connections ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    await io.homePage.loadingTime();
    test.step("*** Opening Debug Connections ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,1);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.DEBUG);
    let logs = (await io.homePage.getText('[id="code"] .ace_content')).toString();
    console.log(logs);
    expect(logs).toBeDefined()
  });
});

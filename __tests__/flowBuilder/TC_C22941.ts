import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C22941.json";

test.describe("TC_C23014_C22941_C23019", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2797|@Env-All @Zephyr-IO-T2787|@Env-All @Zephyr-IO-T2801", async ({io,page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);

    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    //TC_C23014 /T2797 | When the debugger is enabled, and the flow run is triggered, the debugger should automatically show the debugging output in the debugger tab.
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    await io.homePage.loadingTime();
    test.step("Clicked on Connections.", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 1);
    await io.homePage.click(selectors.flowBuilderPagePO.DEBUG_CONNECTION);
    await io.homePage.click(selectors.flowBuilderPagePO.CLEAR_LOGS);

    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 360000});
    await io.homePage.loadingTime();

    await io.homePage.clickByIndex('[data-test="connectionLogs"]', 0);
    let logs = (await io.homePage.getText('[id="code"] .ace_content')).toString();
    expect(logs).toBeDefined()

    // TC_C22941/T2787 | Verify clear debug option is shown and able to clear the logs
    const clearLogBtn =await (await page.getByText('Clear')).isVisible();
    await io.assert.expectToBeTrue(clearLogBtn, "");
    await io.assert.verifyElementToBeClickable(selectors.flowBuilderPagePO.CLEAR_LOGS);
    await io.homePage.clickByText('Clear'); // verifies button is clickable
    const expectedMsg = "Run your flow to see new debug logs.";
    logs = (await io.homePage.getText('[id="code"] .ace_content')).toString();
    expect(logs).toContain(expectedMsg);

    //TC_C23019/T2801 | verify the current option ‘Open debugger’ should be removed from the Actions dropdown on Connections.
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    await io.homePage.loadingTime();
    test.step("Clicked on Connections", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 1);
    const openDebugger = await io.homePage.getDropDownValue(
      selectors.basePagePO.MENU_ITEM,
      "Open debugger"
    );
    await io.assert.expectToBeFalse(openDebugger, "");
  });
});

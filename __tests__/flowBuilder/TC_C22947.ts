import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C22947 from "@testData/FlowBuilder/TC_C22947.json";

test.describe("TC_C22947, TC_C23008, C23018", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2792|@Env-All @Zephyr-IO-T2796|@Env-All @Zephyr-IO-T2800| Verify A new dropdown is added to the tab header where the user can select the debug duration.|To verify If the debug log file is empty, the download button is disabled/greyed out|If the debugger is already enabled, and the user clicks the ‘Debug connection’ action again then focus jumps to that tab.", async ({ io, page }) => {
    //Create Flows
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C22947);
    flowId = await io.api.getFlowId(TC_C22947.name);
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
    await test.step(
      "*** Navigate to Connection Page inside flowbuilder.***"
      , async () => { });
    const row = await page.locator('tr', { hasText: 'ZENDESK CONNECTION' });
    const actionsMenu = row.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await actionsMenu.click();
    test.step("Clicked on action menu button.", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.DEBUG_CONNECTION
    );
    test.step("Clicked on Debug Conection button.", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.REFRESH_RECORD_TYPE,
      0
    );
    var debugdurationButtonCheck = await io.homePage.isVisible(
      selectors.myAccountPagePO.DEBUGTIMEINTERVAL
    );
    await io.assert.expectToBeTrue(debugdurationButtonCheck, "");
    await test.step("'C22947': A new dropdown is added to the tab header where the user can select the debug duration.", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CLEAR_LOGS);
    await io.homePage.loadingTime();
    const downloadLogs = await page.locator(selectors.myAccountPagePO.DOWNLOADLOGS);
    await test.step("*** Verifying if Download logs is disabled ***", async () => { });
    expect(await downloadLogs.isEnabled()).toBeFalsy();
    await test.step("'C23008': When there is no Debug log data, download button is disabled/greyed out.", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
    await test.step("Navigate to Connection Tab again test.afterEach Debug log enabled.", async () => { });
    const row1 = await page.locator('tr', { hasText: 'ZENDESK CONNECTION' });
    const actionsMenu1 = row1.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await actionsMenu1.click();
    test.step("Clicked on action menu button.", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.DEBUG_CONNECTION
    );
    test.step("Clicked on Debug connection.", async () => { });
    await io.homePage.loadingTime();
    expect(await page.getByText('Run your flow to see new debug logs.').isVisible()).toBeTruthy(); 
    await io.api.deleteFlowsWithId([flowId]);
  });
});

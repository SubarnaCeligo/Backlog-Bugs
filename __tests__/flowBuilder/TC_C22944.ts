import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C22944 from "@testData/FlowBuilder/TC_C22944.json";

test.describe("TC_C22944, TC_C34158", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
    test.step("** Deleted flow **", async () => { });
  });
  test("@Env-All @Zephyr-IO-T2970|Verify if multiple debugger tabs are open and clearing the logs on one connection doesn't effect the other logs, @Env-All @Zephyr-IO-T3066|Verify Hide empty runs checkbox when enabled under integration dashboard", async ({ io, page }) => {
    //Create Flows
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C22944);
    flowId = await io.api.getFlowId(TC_C22944.name)
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    const row22 = await page.locator('tr', { hasText: 'ZENDESK CONNECTION' });
    const actionsMenu22 = row22.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await actionsMenu22.click();
    await io.homePage.click(selectors.flowBuilderPagePO.DEBUG_CONNECTION);
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    const row11 = await page.locator('tr', { hasText: 'BIGCOMMERCE CONNECTION' });
    const actionsMenu11 = row11.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await actionsMenu11.click();
    await io.homePage.click(selectors.flowBuilderPagePO.DEBUG_CONNECTION);
    //Run Flow
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 360000});
    await io.homePage.loadingTime();

    test.step("*** Navigating to flowpage ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    await actionsMenu11.click();
    await io.homePage.click(selectors.flowBuilderPagePO.DEBUG_CONNECTION);
    await io.homePage.click(selectors.flowBuilderPagePO.CLEAR_LOGS);

    const expectedMsg = "Run your flow to see new debug logs.";
    let logs = (await io.homePage.getText('[id="code"] .ace_content')).toString();
    expect(logs).toContain(expectedMsg);

    await io.homePage.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
    const row1 = await page.locator('tr', { hasText: 'ZENDESK CONNECTION' });
    const actionsMenu1 = row1.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await actionsMenu1.click();

    await io.homePage.click(
      selectors.flowBuilderPagePO.DEBUG_CONNECTION
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    let logs1 = (await io.homePage.getText('[id="code"] .ace_content')).toString();
    expect(logs1).not.toContain(expectedMsg);

    await io.homePage.click(selectors.flowBuilderPagePO.RUN_HISTORY);
    await io.homePage.loadingTime();
    await io.homePage.clickByText('Hide empty runs');
    await io.homePage.loadingTime();
    expect(await page.getByText("You don't have any run history.").isVisible()).toBeTruthy();
  });
});

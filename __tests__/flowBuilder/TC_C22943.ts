import { test,expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C22943 from "@testData/FlowBuilder/TC_C22943.json";

test.describe("TC_C22943, TC_C22950", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId(flowId);
  });
  test("@Env-All @Zephyr-IO-T2789|To verify logs are cleared after deleting and refreshing page|@Env-All @Zephyr-IO-T2795|To verify the download button", async ({ io,page }) => {
    //Create Flows
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C22943);
    flowId = await io.api.getFlowId(TC_C22943.name)
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    await test.step("*** Navigate to Connection Page inside flowbuilder.***", async () => { });
    const row = await page.locator('tr', { hasText: 'ZENDESK CONNECTION' });
    const actionsMenu = row.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await actionsMenu.click();
    await io.homePage.loadingTime();
    test.step("Clicked on action menu button.", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.DEBUG_CONNECTION);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CLEAR_LOGS);
    test.step("Clicked on Debug Conection button.", async () => { });
    //Run Flow
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 360000});
    await io.homePage.loadingTime();
    const clearLogBtn =await (await page.$(selectors.myAccountPagePO.DOWNLOADLOGS)).isVisible();
    await io.assert.expectToBeTrue(clearLogBtn, "")
    await io.assert.verifyElementToBeClickable(selectors.myAccountPagePO.DOWNLOADLOGS);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CLEAR_LOGS);
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    const row1 = await page.locator('tr', { hasText: 'ZENDESK CONNECTION' });
    const actionsMenu1 = row1.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await actionsMenu1.click();
    await io.homePage.click(selectors.flowBuilderPagePO.DEBUG_CONNECTION);
    await io.homePage.loadingTime();
    const expectedMsg = "Run your flow to see new debug logs.";
    let logs = (await io.homePage.getText('[id="code"] .ace_content')).toString();
    expect(logs).toContain(expectedMsg);
  });
});

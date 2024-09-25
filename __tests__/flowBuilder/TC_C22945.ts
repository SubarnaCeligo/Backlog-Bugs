import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C22945 from "@testData/FlowBuilder/TC_C22945.json";

test.describe("TC_C22945", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async ()=>{});
  });
  test("@Env-All @Zephyr-IO-T2791|Verify clicking Actions > Debug connection -> The debugger tab should automatically open in the console.", async ({io,page}) => {
    //Create Flows
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C22945);
    flowId = await  io.api.getFlowId(TC_C22945.name);
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    await test.step("*** Navigate to Connection Page inside flowbuilder.***", async ()=>{});
    const row = await page.locator('tr', { hasText: 'ZENDESK CONNECTION' });
    const actionsMenu = row.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await actionsMenu.click();  
    test.step("Clicked on action menu button.", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.DEBUG_CONNECTION
    );
    test.step("Clicked on Debug Conection button.", async ()=>{});
    var debugCheck = await io.homePage.isVisible(
      ".Mui-selected[data-test='connectionLogs']"
    );

    await io.assert.expectToBeTrue(debugCheck, "");
await test.step(
      "*** Debug tab is automatically opened test.afterEach clicking Actions > Debug connection.***"
, async ()=>{});
  });
});

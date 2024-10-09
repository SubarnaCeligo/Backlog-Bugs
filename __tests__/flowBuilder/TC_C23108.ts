import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C23108.json";

test.describe("TC_C23108", () => {
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

  test("@Env-All @Zephyr-IO-T2802 | To verify Clear log/Download logs should be disabled for connections not supporting debug logs", async ({io,page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    await io.homePage.loadingTime();
    test.step("Clicked on Connections.", async ()=>{});

    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 1);
    await io.homePage.click(selectors.flowBuilderPagePO.DEBUG_CONNECTION);

    const expectedMsg = "Debug logs not supported for this connection.";
    let logs = (await io.homePage.getText('[id="code"] .ace_content')).toString();
    expect(logs).toContain(expectedMsg);

    let dlLog = await (await page.$(selectors.myAccountPagePO.DOWNLOADLOGS)).isVisible()
    io.assert.expectToBeTrue(dlLog,"")
    await io.assert.verifyElementNotToBeClickable(selectors.myAccountPagePO.DOWNLOADLOGS);
    let clrLog = await (await page.$(selectors.flowBuilderPagePO.CLEAR_LOGS)).isVisible()
    io.assert.expectToBeTrue(clrLog,"")
    await io.assert.verifyElementNotToBeClickable(selectors.flowBuilderPagePO.CLEAR_LOGS);
  });
});

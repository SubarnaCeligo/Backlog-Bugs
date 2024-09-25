import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C24788 from "@testData/FlowBuilder/TC_C24788.json";

test.describe("TC_C24788", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    test.step("*** Delete Flow Using UI***", async () => { });
    await io.api.deleteFlowsWithId(flowId);
  });

  test("@Env-All @Zephyr-IO-T2806| To verify Settings button is shown at right corner, when clicked on settings button, DIY settings page should be opened", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C24788);
    flowId = await io.api.getFlowId(TC_C24788.name);
    test.step("Navigated to flow builder page", async () => { });
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.aliasesPagePO.ALIASES_FLOW_SETTINGS);
    let ans =(await (await page.locator(selectors.flowBuilderPagePO.SCRIPTEDITORHEADER)).textContent()) === "Settings";
    await io.assert.expectToBeTrue(ans, "");
    test.step("Settings page is shown", async () => { });
  });
});

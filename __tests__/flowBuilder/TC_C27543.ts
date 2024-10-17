import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_27543.json";
import TC1 from "@testData/FlowBuilder/TC_27543_sb.json";

test.describe("TC_27543", () => {
  let flowId,flowId1;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId([flowId, flowId1]);
  });

  test("@Env-All @Zephyr-IO-T2992|Verify the flows when standalone titles have the same name in sandbox & Product", async ({ io }) => {
    test.step("*** Navigating to home page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
    await io.homePage.loadingTime();
    await test.step(
      "*** Navigating to standalone integration ***"
      , async () => { });
    var url = await io.homePage.getCurrentUrl();
    console.log("dcdcsc", url);
    let modifiedUrl = url.replace("/home", "");
    await io.homePage.navigateTo(modifiedUrl + "/integrations/none/flows");

    await test.step("*** creating flow in standalone tile in production ***", async () => { });
    await io.homePage.loadingTime();
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    test.step("*** Switching to sandbox environment ***", async () => { });
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
    await io.homePage.loadingTime();
    await test.step("*** Navigating to standalone integration in sandbox environment ***", async () => { });

    await io.homePage.navigateTo(modifiedUrl + "/integrations/none/flows");
    await test.step("*** creating flow in standalone tile in sandbox environment ***", async () => { });
    await io.api.createImpOrExpAndFlowsThruAPI(TC1);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    flowId1 = await io.api.getFlowId(TC1.name);
    await test.step("*** comparing that the flows are not duplicated ***", async () => { });
    expect(flowId).not.toEqual(flowId1);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
    await io.homePage.loadingTime();
  });
});

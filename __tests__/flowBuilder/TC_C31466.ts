import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C31466.json";

test.describe("TC_C31466", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io}) => {
    flowId = await io.api.getFlowId(TC.name);
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2916|To verify multiple connection install steps of same adapter(Netsuite) are displayed while cloning a Flow/Integration", async ({io}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.CLONEFLOW
    );
    await io.homePage.loadingTime();
    test.step("** cloning flow **", async ()=>{});

    await io.homePage.click(
      "[id='mui-component-select-integration']"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      `[data-value="${TC.qa__api_tdata[0].createFlow._integrationId}"]`
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON
    );
    await io.homePage.loadingTime();
    const avialableTexts =await io.flowbranching.flowBranchingPage.getList("p");
await test.step(
      "** checking the presence of both connections **"
, async ()=>{});

    const firstConnection = (await avialableTexts).find(text => {
      return text === "NETSUITE 706 CONNECTION";
    });
    await io.assert.expectToBeValue(String(firstConnection), "NETSUITE 706 CONNECTION", "");

    const secondConnection = (await avialableTexts).find(text => {
      return text === "NETSUITE CONNECTION";
    });
    await io.assert.expectToBeValue(String(secondConnection), "NETSUITE CONNECTION", "");
await test.step(
      "** verfied the presence of both(NETSUITE CONNECTION and  NETSUITE 706 CONNECTION) conections **"
, async ()=>{});
  });
});

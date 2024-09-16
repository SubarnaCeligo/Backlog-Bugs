
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/flowbranching/TC_C47526.json";

test.describe("@Author-ParthPatel TC_C47526", () => {
  let flowId;

  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
      let scriptId = await io.api.getScriptId(TC.script.name);
      if (!scriptId) {
        scriptId = await io.api.createScriptViaAPI(TC.script);
      }
      TC.routers[0].branches[0].pageProcessors[0].qa__import[
        "hooks"
      ].postMap._scriptId = scriptId;
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow ***", async ()=>{
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17608 TC_C47526 Test to add a postmap hook on the PP configured on one of the branch in the flow", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(TC);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    
    await io.homePage.loadingTime();

    var resultJSON = await io.api.validateJobCountFromAPI(
      TC.name,
      TC.qa__expectedDashboardCount
    );

    expect(resultJSON.has(true)).toBeTruthy();
  });
});


import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47450.json";

test.describe("@Author-ParthPatel TC_C47450", () => {
  let flowId;

  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.homePage.loadingTime();
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17519 TC_C47450 | Test to validate the preview of Flow Branch AFE (on branched flow with multiple routers)", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI( flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.homePage.clickByIndex(selectors.flowBranchingPO.ROUTERS, 1);
    await io.homePage.loadingTime();
    await test.step("*** Previewing the results ***", async ()=>{
      await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
      await io.homePage.loadingTime();
      let result = await io.homePage.getText(selectors.mappings.RESULTTEXT);
      let expPreview = "The record will pass through branch 2: R2B3";
      expect(result).toContain(expPreview);
    });
  });
});


import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47518.json";
test.describe("@Author-ParthPatel TC_C47518_C47587", () => {
  let flowId

  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting Flow. ***", async ()=>{
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17592 @Zephyr-IO-T17666 TC_C47518_C47587 Test to create a http lookup and then add router with atleast 2 branches", async ({io,page}, testInfo) => {
    //Test to create a http lookup and then add router with atleast 2 branches
    flowId = await io.flowbranching.createFlowBranchFromAPI(
      flowbranch
    );
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();

    //TC_C47587 | Test to add a lookup and then preview the data on an import added on a branch
    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 0);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();

    let output = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString();
    await io.assert.expectToContainValue("organization", output, "");
    await io.flowbranching.flowBranchingPage.closeDrawer();

    await io.homePage.loadingTime();
    var resultJSON = await io.api.validateJobCountFromAPI(
      flowbranch.name,
      flowbranch.qa__expectedDashboardCount
    );
    expect(resultJSON.has(true)).toBeTruthy();
  });
});

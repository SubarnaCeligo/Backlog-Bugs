
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import flowbranch from "@testData/flowbranching/TC_47983_Flowbranching.json";
import { allure } from "allure-playwright";

test.describe("@Author-ParthPatel C47983", () => {
  let flowId;

  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.api.deleteFlowsWithId([flowId]);
    });
  });


  test("@Env-All @Zephyr-IO-T17342 C47983 Verify merging at terminal edge of two PP", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);

    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);

    var handle = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(0);
    var target = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(1);
    await handle.dragTo(target);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
    await expect(page.locator(selectors.flowBranchingPO.MERGE_NODE)).toBeVisible();
    await expect(page.locator(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP)).toBeVisible();
  });
});

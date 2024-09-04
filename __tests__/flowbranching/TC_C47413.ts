
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47413.json";
import { allure } from "allure-playwright";

test.describe("@Author-ParthPatel TC_C47413_Flowbranching_TO_Validte_setupInProgress_Field_Value_For_Empty_PP_Bubbles", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.homePage.loadingTime();
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T17495 @Zephyr-IO-T17503 TC_C47413_C47422", async ({io,page}, testInfo) => {
    // *Create Page Generators
    await test.step("*** Creating PageGenerator ***", async ()=>{
      await io.pageGenerator(allure, flowbranch);
      await io.homePage.reloadPage();
      await io.homePage.loadingTime();
    });
    await test.step("*** Clicked on Router Button ***", async ()=>{
      await io.homePage.loadingTime();
      await io.homePage.clickByIndex(
        selectors.flowBranchingPO.ROUTER_BUTTON,
        0
      );
    });
    await test.step("*** Clicked on add branching ***", async ()=>{
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.basePagePO.MENU_ITEM,
        "Add branching"
      );
      await io.homePage.loadingTime();
    });
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      selectors.flowBranchingPO.ROUTER_BUTTON,
      2
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.basePagePO.MENU_ITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await test.step("*** getting the flowID ***", async ()=>{
      flowId = await page.url().split('flowBuilder/')[1];
    });
    var flowResponse = await io.api.getFlowById(flowId);
    await test.step("*** validating setupInProgress ***", async ()=>{
      var flag = JSON.stringify(
        flowResponse.routers[0].branches[0].pageProcessors
      );
      await io.assert.expectToContainValue("setupInProgress",flag, "");
      await io.assert.expectToContainValue("true",flag, "");
      flag = JSON.stringify(flowResponse.routers[1].branches[1].pageProcessors);
      await io.assert.expectToContainValue("setupInProgress",flag, "");
      await io.assert.expectToContainValue("true",flag, "");
    });
  });
});

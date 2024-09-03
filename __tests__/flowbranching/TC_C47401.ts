
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47401.json";

test.describe("@Author-ParthPatel TC_C47401_BE_Script_Details_Validation", () => {
  let scriptId;
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Go to flows page ***", async ()=>{});
    await io.goToFlowsPage();
    scriptId = await io.api.getScriptId(flowbranch.scriptBody.name);
    if (!scriptId) {
      scriptId = await io.api.createScriptViaAPI(
        flowbranch.scriptBody
      );
    }
  });
  test.afterEach(async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.api.deleteFlowsWithId(flowId);
  });
  test("@Env-All @Zephyr-IO-T17483 TC_C47401_BE_Script_Details_Validation", async ({io,page}, testInfo) => {
    await test.step("*** Creating Flow ***", async ()=>{
      flowId = await io.flowbranching.createFlowBranchFromAPI(flowbranch);
      await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    });
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.EDIT_BRANCHING);
    await io.homePage.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    await io.homePage.click(selectors.basePagePO.SCRIPT_ID);
    const option = await page.locator(`[data-value='${scriptId}']`);
    await option.click();
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.FUNCTION_NAME, 'preSavePage');
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    var id = await io.api.getFlowId(flowbranch.name);
    var schema = await io.api.getFlowById(id);
    expect(schema.routers[0].script).toHaveProperty("_scriptId", scriptId);
  });
});


import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C45126.json";

test.describe("@Author-ParthPatel TC_C45124_C45126", () => {
  let id;
  let scriptId;
  test.beforeEach(async ({io}) => {
    await test.step("*** Creating Required Resources ***", async ()=>{
      await io.goToFlowsPage();
      let scriptId = await io.api.getScriptId(flowbranch.scriptBody.name);
      if (!scriptId) {
        scriptId = await io.api.createScriptViaAPI(
          flowbranch.scriptBody
        );
      }
    });
  });

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
    await io.api.deleteScriptViaAPI(scriptId);
  });

  test("'@Env-All @Zephyr-IO-T17288 @Zephyr-IO-T17290 TC_C45124_C45126 Verify the script function with existing script available", async ({io, page}) => {
    await test.step("*** Creating PageGenerator ***", async ()=>{
      id = await io.createResourceFromAPI(flowbranch, 'FLOWS');
    });

    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.flowBranchingPO.ROUTER_BUTTON
    );    
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.basePagePO.JAVASCRIPTWINDOW
    );

    await io.homePage.click(
      selectors.basePagePO.SCRIPT_ID
    );
    await page.getByRole('option', { name: flowbranch.scriptBody.name, exact: true }).nth(0).click();

    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );
    await io.homePage.loadingTime();
    var result = (await io.homePage.getText(selectors.mappings.RESULTTEXT)).toString();
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );

    await io.assert.expectToContainValue("Branch 1.0",result, "");
  });
});

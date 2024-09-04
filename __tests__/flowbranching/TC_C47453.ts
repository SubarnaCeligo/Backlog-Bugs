
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ParthPatel TC_C47453", () => {
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T17522 TC_C47453 | Test to validate the preview of Flow Branch AFE when input data is empty ", async ({io, page}) => {
    await test.step("Clicked On Add branching .", async ()=>{
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.loadingTime();
      await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 0);
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
    });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.ADD_BRANCH);
    await io.homePage.click(selectors.flowBranchingPO.ADD_BRANCH);
    await io.homePage.clearTextValue(selectors.exportsPagePO.FORM_DEFINITION);
    await io.homePage.fill(selectors.exportsPagePO.SAMPLE_DATA_TEXTAREA, '{}');
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();
    var result = await io.homePage.getText(selectors.mappings.RESULTTEXT);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    expect(result).toContain(
      "The record will pass through branch 0: Branch 1.0"
    );
  });
});

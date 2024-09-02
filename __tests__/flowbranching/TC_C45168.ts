
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47447.json";

test.describe("@Author-ParthPatel TC_C45168 and TC_45149", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T17314 @Zephyr-IO-T17305 TC_C45168", async ({io,page}, testInfo) => {
    // TC_C45168 - Verify zoom functionality and mini controls added at the left bottom
    flowId = await io.flowbranching.createFlowBranchFromAPI( flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);

    await test.step("All buttons are clickable", async ()=>{
      await io.assert.verifyElementToBeClickable(selectors.flowBranchingPO.ZOOM_IN);
      await io.assert.verifyElementToBeClickable(selectors.flowBranchingPO.ZOOM_OUT);
      await io.assert.verifyElementToBeClickable(selectors.mappings.MAPPER2DOT0PO.FITVIEW);
      await io.assert.verifyElementToBeClickable(selectors.flowBuilderPagePO.FLOW_SHOW_HIDE_MAP)
    });

    // TC_C45149  - Verify the add button under "Destination and lookups" for branched flows.
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.basePagePO.LOOKUP_ADD_BUTTON
    );
    await test.step("menu List with all the branches name are present", async ()=>{
      let ans = await io.homePage.getDropDownValue(
        selectors.basePagePO.MENU_ITEM,
        "R1B1"
      );
      await io.assert.expectToBeTrue(ans, "");
      ans = await io.homePage.getDropDownValue(
        selectors.basePagePO.MENU_ITEM,
        "R1B2"
      );
      await io.assert.expectToBeTrue(ans, "");
    });
  });
});

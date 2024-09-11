
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("@Author-ParthPatel TC_C45123", () => {
  let router;
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", async ()=>{
      router = await io.api.createScriptViaAPI({
        name: "branching",
        content: "function branching (options) {return [\"0\"]}"
      });
      await io.goToFlowsPage();
    });
  });
  test.afterEach(async ({ io, page  }) => {
    await io.api.deleteScriptViaAPI(router);
});
  test('@Env-All @Zephyr-IO-T17287  Verify the script when "Javascript" and "all matching branches" is selected', async ({io,page}, testInfo) => {
    await test.step("Clicking on Create Flow", async ()=>{
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.loadingTime();
    });

    await io.homePage.click(selectors.flowBranchingPO.ROUTER_BUTTON);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    await io.homePage.click(selectors.flowBranchingPO.ALL_MATCHING_BRANCHES);

    await io.flowbranching.flowBranchingPage.clickButtonNTimes(
      selectors.flowBranchingPO.ADD_BRANCH,
      6
    );

    await test.step("Indexes are peoperly given", async ()=>{
      let indexes = await page.$$("li > div.MuiTypography-overline");
      for (let i = 0; i < indexes.length; i += 1) {
        let index = await indexes[i].textContent();
        let num = parseInt(index);
        expect(num).toEqual(i);
      }
    });

    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_LIST_DROPDOWN_ID);
    await page.getByRole('option', { name: 'branching', exact: true }).nth(0).click();

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
    
    await test.step("Opened Edit branching drawer", async ()=>{
      await io.homePage.click(selectors.flowBuilderPagePO.EDIT_BRANCHING);
      await io.homePage.loadingTime();
    });

    await test.step("Scrolling is working correctly", async ()=>{
      let elements = await page.$$(selectors.flowBranchingPO.BRANCH_NAMES);
      let ele = elements[elements.length - 1];
      await ele.focus();
    });
  });
});

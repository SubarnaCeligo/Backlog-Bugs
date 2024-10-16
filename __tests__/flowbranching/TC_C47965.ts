
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Author-ParthPatel TC_C47965_C45555_C45109", () => {
  test("@Env-All @Zephyr-IO-T17326 TC_C47965| Verify delete branch under edit branch window  ", async ({io,page}, testInfo) => {
    await test.step("Clicking on Create Flow", async ()=>{
      await io.goToFlowsPage();
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.isPageReady();
      await io.homePage.loadingTime();
    });
    await io.homePage.click(selectors.flowBranchingPO.ROUTER_BUTTON);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
    await io.homePage.click(selectors.flowBranchingPO.ROUTERS);
    await io.homePage.loadingTime();

    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.EDIT_BRANCH_NAME_BTN, 0);
    let list = await io.flowbranching.flowBranchingPage.getList(
      selectors.basePagePO.MENU_ITEM
    );
    await io.assert.expectToBeValue(String(list[1]), "Delete branch", "");
    await io.homePage.clickButtonByIndex(selectors.basePagePO.MENU_ITEM, 1);
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    let ans = await page.locator(selectors.flowBranchingPO.BRANCH_NAMES).nth(0).textContent();
    await io.assert.expectToBeValue(String(ans), "Branch 1.1", "Second default branch name not matching");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T17318 TC_C45555| Verify Editor title under branching router  ", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.isPageReady();
    await test.step("Clicking on Create Flow", async ()=>{
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.isPageReady();
      await io.homePage.loadingTime();
    });

    await io.homePage.click(selectors.flowBranchingPO.ROUTER_BUTTON);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();

    let heading = await io.homePage.getText(selectors.flowBranchingPO.AFE_HEADINGS);
    await io.assert.expectToBeValue(String(heading), "Add branching", "");

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
    await io.homePage.click(selectors.flowBranchingPO.ROUTERS);
    await io.homePage.loadingTime();

    let editheading = await io.homePage.getText(selectors.flowBranchingPO.AFE_HEADINGS);
    await io.assert.expectToBeValue(String(editheading), "Edit branching", "");

    await io.homePage.click(selectors.importPagePO.IMPORT_HANDLEBAR_CLOSE_DRAWER);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T17274 TC_C45109| Verify whether branches are expandables ", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.isPageReady();
    await test.step("Clicking on Create Flow", async ()=>{
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.isPageReady();
      await io.homePage.loadingTime();
    });

    await io.homePage.click(selectors.flowBranchingPO.ROUTER_BUTTON);

    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();
    const expandIcon = await page.locator(selectors.basePagePO.ACCORDION_ICON).nth(0);
    
    expect(await expandIcon.evaluate(el => el.classList.contains('Mui-expanded'))).toBeTruthy();
    await expandIcon.click();
    expect(await expandIcon.evaluate(el => el.classList.contains('Mui-expanded'))).not.toBeTruthy();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
  });
});
